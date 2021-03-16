export const findEnvOrFail = (
  envKey: string,
  allowedOptions?: string[],
): string => {
  const value = process.env[envKey];

  if (typeof value === 'undefined') {
    throw new Error(
      `Environment variable ${envKey} is not set! Please set it in your .env file.`,
    );
  }

  if (allowedOptions && allowedOptions.indexOf(value) === -1) {
    throw new Error(
      `Environment variable ${envKey} must take one of the following values: ${allowedOptions.join(
        ', ',
      )}. Please set it in your .env file.`,
    );
  }

  return value;
};
