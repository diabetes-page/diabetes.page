import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
