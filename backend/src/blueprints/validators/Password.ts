import {
  minLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// From https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc

abstract class PasswordValidator implements ValidatorConstraintInterface {
  private readonly minPasswordLength: number;

  protected constructor(configService: ConfigService) {
    this.minPasswordLength = configService.get<number>(
      'security.minPasswordLength',
      8,
    );
  }

  public async validate(value: string): Promise<boolean> {
    return minLength(value, this.minPasswordLength);
  }

  public defaultMessage(): string {
    // todo: unclear how to do i18n support
    return `Password must be at least ${this.minPasswordLength} characters long`;
  }
}

@ValidatorConstraint({ name: 'password', async: false })
@Injectable()
export class Password extends PasswordValidator {
  constructor(protected configService: ConfigService) {
    super(configService);
  }
}
