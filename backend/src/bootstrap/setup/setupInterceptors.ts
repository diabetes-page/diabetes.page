import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const setupInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(createClassSerializerInterceptor(app));
};

const createClassSerializerInterceptor = (app: INestApplication) => {
  return new ClassSerializerInterceptor(app.get(Reflector), {
    strategy: 'excludeAll',
  });
};
