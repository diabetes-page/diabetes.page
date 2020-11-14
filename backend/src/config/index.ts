import { securityConfig } from './security';
import { jitsiConfig } from './jitsi';

export const config = (): Record<string, any> => ({
  environment: process.env.NODE_ENV,
  security: securityConfig(),
  jitsi: jitsiConfig(),
});
