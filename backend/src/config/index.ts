import { securityConfig } from './security';
import { jitsiConfig } from './jitsi';
import { conferenceConfig } from './conference';

export const config = (): Record<string, any> => ({
  environment: process.env.NODE_ENV,
  security: securityConfig(),
  jitsi: jitsiConfig(),
  conference: conferenceConfig(),
});
