import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/AppModule';
import { setupPipes } from './pipes/setupPipes';
import { setupInterceptors } from './interceptors/setupInterceptors';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  setupPipes(app);
  setupInterceptors(app);

  if (process.env.NODE_ENV !== 'testing') {
    await app.listen(3000);
  }

  return app;
}
