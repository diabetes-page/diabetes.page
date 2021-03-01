import { jitsiConfig } from './jitsi';
import { securityConfig } from './security';

export const config = (): Record<string, any> => ({
  environment: process.env.NODE_ENV,
  security: securityConfig(),
  jitsi: jitsiConfig(),
});
