import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { Connection, EntitySchema, ObjectType } from 'typeorm';

// From https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc

type EntityClass<E> = ObjectType<E> | EntitySchema<E> | string;
interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [EntityClass<E>, keyof E];
}

abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected message: string;

  protected constructor(
    protected connection: Connection,
    protected i18n: I18nService,
  ) {}

  public async validate<E>(
    value: string,
    args: UniqueValidationArguments<E>,
  ): Promise<boolean> {
    const entityClass = args.constraints[0];
    const property = args.constraints[1] ?? args.property;
    const count = await this.connection.getRepository(entityClass).count({
      where: {
        [property]: value,
      },
    });
    await this.buildMessage(entityClass, property);

    return count <= 0;
  }

  private async buildMessage<E>(
    entityClass: EntityClass<E>,
    property: keyof E,
  ): Promise<void> {
    const entityClassString =
      typeof entityClass !== 'string' && 'name' in entityClass
        ? entityClass.name
        : entityClass.toString();

    this.message = await this.i18n.translate(
      'validation.UNIQUE_ERROR_MESSAGE',
      {
        args: {
          entityClass: entityClassString,
          property,
        },
      },
    );
  }

  public defaultMessage(): string {
    return this.message;
  }
}

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class Unique extends UniqueValidator {
  constructor(@InjectConnection() connection: Connection, i18n: I18nService) {
    super(connection, i18n);
  }
}
