import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { setupPipes } from './pipes/setupPipes';
import { setupInterceptors } from './interceptors/setupInterceptors';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  setupPipes(app);
  setupInterceptors(app);

  await app.listen(3000);
}
