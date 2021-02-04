import { INestApplication } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { NestFactory } from '@nestjs/core';
import { setupInterceptors } from './interceptors/setupInterceptors';
import { AppModule } from './modules/app/AppModule';
import { setupPipes } from './pipes/setupPipes';

export async function bootstrap(test = false): Promise<INestApplication> {
  const options: NestApplicationOptions = {
    logger: ['error', 'warn'],
    cors: {
      origin: 'http://localhost:19006', // todo: put in .env
    },
  };
  const app = await NestFactory.create(AppModule, options);

  setupPipes(app);
  setupInterceptors(app);

  await app.listen(test ? 0 : 3000);

  return app;
}
