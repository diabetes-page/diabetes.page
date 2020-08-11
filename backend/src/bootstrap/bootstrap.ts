import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/AppModule';
import { setupPipes } from './pipes/setupPipes';
import { setupInterceptors } from './interceptors/setupInterceptors';
import { useContainer } from 'class-validator';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  setupPipes(app);
  setupInterceptors(app);

  // Reason: https://github.com/nestjs/nest/issues/528
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
