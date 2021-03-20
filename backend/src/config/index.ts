import { environmentConfig } from './environment';
import { i18nConfig } from './i18n';
import { jitsiConfig } from './jitsi';
import { mailerConfig } from './mailer';
import { securityConfig } from './security';

export const config = (): Record<string, any> => ({
  environment: environmentConfig(),
  security: securityConfig(),
  jitsi: jitsiConfig(),
  i18n: i18nConfig(),
  mailer: mailerConfig(),
});
