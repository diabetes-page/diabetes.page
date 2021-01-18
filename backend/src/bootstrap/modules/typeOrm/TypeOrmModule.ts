import { TypeOrmModule as TypeOrmModuleBase } from '@nestjs/typeorm';

export const TypeOrmModule = TypeOrmModuleBase.forRootAsync({
  // This must be an async module in order to load the env properly, especially when env is set during testing
  // @ts-ignore : We can assume that the config values are present and of correct type
  useFactory: async () => {
    return {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      migrations: [process.env.TYPEORM_MIGRATIONS],
      entities: [process.env.TYPEORM_ENTITIES],
    };
  },
});
