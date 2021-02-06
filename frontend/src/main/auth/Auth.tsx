import { StatusCodes } from 'http-status-codes';
import React, { useEffect } from 'react';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/constants/constants';
import {
  SafeDispatch,
  useSafeDispatch,
} from '../../redux/root/useSafeDispatch';
import { SET_USER } from '../../redux/user/actions';
import { handleStatusError } from '../../utilities/misc/errors';
import { checkAuthStatus } from '../../utilities/requests/requests';

export function Auth(): JSX.Element {
  useEstablishConnection();
  return <></>;
}

const useEstablishConnection = (): void => {
  const dispatch = useSafeDispatch();

  useEffect(() => void establishConnection(dispatch), []);
};

const establishConnection = async (dispatch: SafeDispatch): Promise<void> => {
  // Todo #1: Instead of using checkAuthStatus, just grab own user immediately
  const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

  if (!token) {
    return markLoadingFinished(dispatch);
  }
  try {
    await checkAuthStatus();
  } catch (error) {
    // todo: handle other errors
    handleStatusError(error, {
      [StatusCodes.UNAUTHORIZED]: () => markLoadingFinished(dispatch),
    });
  }

  // todo: See todo #1
  dispatch({
    type: SET_USER,
    user: { id: 1 },
  });
};

const markLoadingFinished = (dispatch: SafeDispatch): void => {};
