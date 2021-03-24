import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { Connection, EntitySchema, ObjectType } from 'typeorm';

type EntityClass<E> = ObjectType<E> | EntitySchema<E> | string;
interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [EntityClass<E>, keyof E | undefined];
}

abstract class ExistsValidator implements ValidatorConstraintInterface {
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
    let success = false;

    try {
      const count = await this.connection.getRepository(entityClass).count({
        where: {
          [property]: value,
        },
      });
      success = count > 0;
    } catch {}

    if (!success) {
      await this.buildMessage(entityClass, property);
    }

    return success;
  }

  private async buildMessage<E>(
    entityClass: EntityClass<E>,
    property: keyof E | string,
  ): Promise<void> {
    const entityClassString =
      typeof entityClass !== 'string' && 'name' in entityClass
        ? entityClass.name
        : entityClass.toString();

    this.message = await this.i18n.translate(
      'validation.EXISTS_ERROR_MESSAGE',
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

@ValidatorConstraint({ name: 'exists', async: true })
@Injectable()
export class Exists extends ExistsValidator {
  constructor(@InjectConnection() connection: Connection, i18n: I18nService) {
    super(connection, i18n);
  }
}
