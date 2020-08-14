import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/AppModule';
import { setupPipes } from './pipes/setupPipes';
import { setupInterceptors } from './interceptors/setupInterceptors';
import { useContainer } from 'class-validator';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  setupPipes(app);
  setupInterceptors(app);

  // This is needed in order to do dependency injection for custom validators, see
  // https://github.com/nestjs/nest/issues/528
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (process.env.NODE_ENV !== 'testing') {
    await app.listen(3000);
  }

  return app;
}
