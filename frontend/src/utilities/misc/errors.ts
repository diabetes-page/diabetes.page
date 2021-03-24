import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { RESET_REDUX } from '../../redux/root/actions';
import { useSafeDispatch } from '../../redux/root/hooks';
import { SET_SNACKBAR } from '../../redux/snackbar/actions';
import { AxiosError, ErrorResource } from '../requests/requests';

export const useError = <T>(): [
  error: ErrorResource<T> | null,
  resetError: () => void,
  onError: (baseError: AxiosError<T>) => void,
] => {
  const [errorData, setErrorData] = useState<ErrorResource<T> | null>(null);
  const dispatch = useSafeDispatch();
  const resetErrorData = (): void => setErrorData(null);

  const onError = (baseError: AxiosError<T>): void => {
    if (
      baseError?.response?.status === StatusCodes.BAD_REQUEST &&
      baseError?.response?.data
    ) {
      setErrorData(baseError.response.data);
    } else if (baseError?.response?.status === StatusCodes.UNAUTHORIZED) {
      dispatch({
        type: RESET_REDUX,
      });
    } else if (baseError?.response?.status === StatusCodes.FORBIDDEN) {
      dispatch({
        type: SET_SNACKBAR,
        variant: 'error',
        message: "You don't have permission to access this resource.", // todo: translate
      });
    } else {
      const baseErrorAny = baseError as any;
      dispatch({
        type: SET_SNACKBAR,
        variant: 'error',
        message: `An unexpected error occurred. 
        Please try reloading the page. 
        Status code: ${baseErrorAny?.response?.status}. 
        Error: ${baseErrorAny?.toString()}. 
        Message: ${baseErrorAny?.response?.data?.message}. 
        Error description: ${baseErrorAny?.response?.data?.error}. 
        `, // todo: translate
      });
    }
  };

  return [errorData, resetErrorData, onError];
};
