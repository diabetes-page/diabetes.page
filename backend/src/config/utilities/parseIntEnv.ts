export const parseIntEnv = (envKey: string): number => {
  const value = process.env[envKey] || '';

  return parseInt(value);
};
