import { findEnvOrFail } from './utilities/findEnvOrFail';

export const environmentConfig = (): Record<string, any> => {
  const environment = findEnvOrFail('NODE_ENV', [
    'production',
    'development',
    'testing',
  ]);

  return {
    isTesting: 'testing' === environment,
    isDevelopment: 'development' === environment,
    isProduction: 'production' === environment,
  };
};
