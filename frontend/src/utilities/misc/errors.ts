import { StatusCodes } from 'http-status-codes';

export const handleStatusError = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  error: any,
  reactions: Partial<Record<StatusCodes, () => void>>,
): void => {
  const status: StatusCodes | undefined = error?.response?.status;

  if (status && reactions[status]) {
    return reactions[status]!();
  }

  throw error;
};
