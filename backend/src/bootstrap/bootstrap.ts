import { INestApplication } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { NestFactory } from '@nestjs/core';
import { setupInterceptors } from './interceptors/setupInterceptors';
import { AppModule } from './modules/app/AppModule';
import { TestingModule } from './modules/testing/TestingModule';
import { setupPipes } from './pipes/setupPipes';

export async function bootstrap(test = false): Promise<INestApplication> {
  const options: NestApplicationOptions = {
    cors: {
      origin: 'http://localhost:19006', // todo: put in .env
    },
  };
  const mainModule = test ? TestingModule : AppModule;
  const app = await NestFactory.create(mainModule, options);

  setupPipes(app);
  setupInterceptors(app);

  await app.listen(test ? 0 : 3000);

  return app;
}
