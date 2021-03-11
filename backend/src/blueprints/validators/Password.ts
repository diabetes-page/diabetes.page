import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  minLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';

// From https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc

abstract class PasswordValidator implements ValidatorConstraintInterface {
  protected readonly minPasswordLength: number;
  protected message: string;

  protected constructor(
    configService: ConfigService,
    protected i18n: I18nService,
  ) {
    this.minPasswordLength = configService.get<number>(
      'security.minPasswordLength',
      8,
    );
  }

  public async validate(value: string): Promise<boolean> {
    await this.buildMessage();

    return minLength(value, this.minPasswordLength);
  }

  private async buildMessage(): Promise<void> {
    this.message = await this.i18n.translate(
      'validation.PASSWORD_ERROR_MESSAGE',
      {
        args: {
          minPasswordLength: this.minPasswordLength,
        },
      },
    );
  }

  public defaultMessage(): string {
    return this.message;
  }
}

@ValidatorConstraint({ name: 'password', async: false })
@Injectable()
export class Password extends PasswordValidator {
  constructor(configService: ConfigService, i18n: I18nService) {
    super(configService, i18n);
  }
}
