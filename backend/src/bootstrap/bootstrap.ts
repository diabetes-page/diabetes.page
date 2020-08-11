import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { setupPipes } from './setup/setupPipes';
import { setupInterceptors } from './setup/setupInterceptors';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  setupPipes(app);
  setupInterceptors(app);

  await app.listen(3000);
}
