import { INestApplication } from '@nestjs/common';
import { ResourceInterceptor } from './ResourceInterceptor';

export const setupInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(new ResourceInterceptor());
};
