import { StatusCodes } from 'http-status-codes';

export const handleStatusError = <ReturnType>(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  error: any,
  reactions: Partial<Record<StatusCodes, () => ReturnType>>,
): ReturnType => {
  const status: StatusCodes | undefined = error?.response?.status;

  if (status && reactions[status]) {
    return reactions[status]!();
  }

  throw error;
};
