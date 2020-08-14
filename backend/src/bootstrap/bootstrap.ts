import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/AppModule';
import { setupPipes } from './pipes/setupPipes';
import { setupInterceptors } from './interceptors/setupInterceptors';
import { INestApplication } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';

export async function bootstrap(
  options?: NestApplicationOptions,
  test = false,
): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, options);

  setupPipes(app);
  setupInterceptors(app);

  if (!test) {
    await app.listen(3000);
  }

  return app;
}
