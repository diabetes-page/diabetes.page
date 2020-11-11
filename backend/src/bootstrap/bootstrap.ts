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
  // todo: don't allow passing options, just test mode or not.
  options = options ?? {};
  options.cors = {
    origin: 'http://localhost:19006', // todo: put in .env
  };
  const app = await NestFactory.create(AppModule, options);

  setupPipes(app);
  setupInterceptors(app);

  await app.listen(test ? 0 : 3000);

  return app;
}
