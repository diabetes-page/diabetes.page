import {
  BadRequestException,
  INestApplication,
  ValidationError as NestValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../modules/app/AppModule';

export type ValidationError = Record<string, string[]>;

export const setupValidationPipe = (app: INestApplication): void => {
  app.useGlobalPipes(getValidationPipe());

  // This is needed in order to do dependency injection for custom validators
  // see https://github.com/nestjs/nest/issues/528
  // Also, this is not a react hook, just the name sounds like it, hence the next line
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};

export const getValidationPipe = (): ValidationPipe =>
  new ValidationPipe({
    validationError: {
      target: false,
      value: false,
    },
    exceptionFactory: (errors: NestValidationError[]): BadRequestException =>
      new BadRequestException(transformErrors(errors)),
  });

function transformErrors(errors: NestValidationError[]): ValidationError {
  const transformed: ValidationError = {};

  errors.forEach((error) => {
    const { property, constraints } = error;

    if (!constraints) {
      return;
    }

    if (!transformed[property]) {
      transformed[property] = [];
    }

    transformed[property] = transformed[property].concat(
      Object.values(constraints),
    );
  });

  return transformed;
}
