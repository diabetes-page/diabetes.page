import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../modules/app/AppModule';

export const setupPipes = (app: INestApplication): void => {
  setupValidationPipe(app);
};

export const getValidationPipe = (): ValidationPipe => new ValidationPipe();

const setupValidationPipe = (app: INestApplication): void => {
  app.useGlobalPipes(getValidationPipe());

  // This is needed in order to do dependency injection for custom validators
  // see https://github.com/nestjs/nest/issues/528
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
