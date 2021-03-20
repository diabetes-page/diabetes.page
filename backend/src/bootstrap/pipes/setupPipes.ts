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
  // Also, this is not a react hook, just the name sounds like it, hence the next line
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
