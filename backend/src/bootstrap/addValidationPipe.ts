import { INestApplication, ValidationPipe } from '@nestjs/common';

export const addValidationPipe = (app: INestApplication): void =>
  void app.useGlobalPipes(
    new ValidationPipe(),
  );
