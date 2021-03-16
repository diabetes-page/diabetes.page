import { findEnvOrFail } from './utilities/findEnvOrFail';
import { parseIntEnv } from './utilities/parseIntEnv';

export const mailerConfig = (): Record<string, any> => ({
  host: findEnvOrFail('MAILER_CONFIG_HOST'),
  port: parseIntEnv('MAILER_CONFIG_PORT') || 1025,
  username: findEnvOrFail('MAILER_CONFIG_USERNAME'),
  password: findEnvOrFail('MAILER_CONFIG_PASSWORD'),
});
