import {securityConfig} from './security';

export const config = (): Record<string, any> => ({
    security: securityConfig(),
});
