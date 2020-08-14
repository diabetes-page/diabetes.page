import { securityConfig } from './security';
import { databaseConfig } from './database';

export const config = (): Record<string, any> => ({
  environment: process.env.NODE_ENV,
  security: securityConfig(),
  database: databaseConfig(),
});
