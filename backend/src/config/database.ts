import { findEnvOrFail } from './utilities/findEnvOrFail';
import { parseIntEnv } from './utilities/parseIntEnv';

export const databaseConfig = (): Record<string, any> => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseIntEnv('DB_PORT') || 5432,
  user: findEnvOrFail('DB_USER'),
  password: findEnvOrFail('DB_PASSWORD'),
  database: findEnvOrFail('DB_DATABASE_NAME'),
  entityPattern: process.env.DB_ENTITY_PATTERN || 'dist/**/*.entity.js',
});
