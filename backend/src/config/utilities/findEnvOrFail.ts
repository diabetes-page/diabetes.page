export const findEnvOrFail = (envKey: string): string => {
  const value = process.env[envKey];

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${envKey} is not set!`);
  }

  return value;
};
