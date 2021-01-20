import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

// From https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc

interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E,
  ];
}

abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected constructor(protected connection: Connection) {}

  public async validate<E>(
    value: string,
    args: UniqueValidationArguments<E>,
  ): Promise<boolean> {
    const [EntityClass, findCondition = args.property] = args.constraints;
    const count = await this.connection.getRepository(EntityClass).count({
      where:
        typeof findCondition === 'function'
          ? findCondition(args)
          : {
              [findCondition || args.property]: value,
            },
    });
    return count <= 0;
  }

  public defaultMessage(args: ValidationArguments): string {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';

    // todo: unclear how to do i18n support
    // see https://github.com/typestack/class-validator/issues/169
    // and https://github.com/ToonvanStrijp/nestjs-i18n/issues/97
    // and the solution in https://github.com/typestack/class-validator/pull/238
    return `${entity} with the same '${args.property}' already exist`;
  }
}

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class Unique extends UniqueValidator {
  constructor(@InjectConnection() protected connection: Connection) {
    super(connection);
  }
}
