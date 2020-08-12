import { findEnvOrFail } from './utilities/findEnvOrFail';
import { parseIntEnv } from './utilities/parseIntEnv';

export const securityConfig = (): Record<string, any> => ({
  secretKey: findEnvOrFail('SECRET_KEY'),
  tokenExpiry: process.env.TOKEN_EXPIRY || '3h',
  minPasswordLength: parseIntEnv('MIN_PASSWORD_LENGTH') || 8,
  bcryptSaltRounds: parseIntEnv('BCRYPT_SALT_ROUNDS') || 10,
});
