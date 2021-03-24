import { INestApplication } from '@nestjs/common';
import { setupValidationPipe } from './validationPipe';

export const setupPipes = (app: INestApplication): void => {
  setupValidationPipe(app);
};
