import { findEnvOrFail } from './utilities/findEnvOrFail';

export const jitsiConfig = (): Record<string, any> => ({
  jitsiAppId: findEnvOrFail('JITSI_APP_ID'),
  secretKey: findEnvOrFail('JITSI_SECRET_KEY'),
  jwtIssuer: findEnvOrFail('JITSI_JWT_ISSUER'),
});
