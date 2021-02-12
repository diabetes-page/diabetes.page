import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect } from 'react';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/security';
import { DEREGISTER_LOADING_INITIAL } from '../../redux/loading/actions';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { SafeDispatch, useSafeDispatch } from '../../redux/root/hooks';
import { SET_USER } from '../../redux/user/actions';
import { handleStatusError } from '../../utilities/misc/errors';
import { requests } from '../../utilities/requests/requests';

export function Auth(): JSX.Element {
  useEstablishConnection();
  return <></>;
}

const useEstablishConnection = (): void => {
  const dispatch = useSafeDispatch();

  useEffect(() => void establishConnection(dispatch), [dispatch]);
};

const establishConnection = async (dispatch: SafeDispatch): Promise<void> => {
  // Todo: Don't use AsyncStorage, as it is insecure
  const token = await AsyncStorage.getItem(LOCAL_STORAGE_JWT_KEY);

  if (!token) {
    return saveResult(false, dispatch);
  }

  try {
    const status = await requests.checkAuthStatus();
    const userResponse = await requests.showUser(status.data.userId);
    dispatch({
      type: SET_USER,
      user: userResponse.data,
    });
  } catch (error) {
    // todo: handle other errors
    return handleStatusError(error, {
      [StatusCodes.UNAUTHORIZED]: () => saveResult(false, dispatch),
    });
  }

  return saveResult(true, dispatch);
};

const saveResult = async (
  result: boolean,
  dispatch: SafeDispatch,
): Promise<void> => {
  dispatch({
    type: DEREGISTER_LOADING_INITIAL,
    action: SET_LOGGED_IN,
  });
  dispatch({
    type: SET_LOGGED_IN,
    loggedIn: result,
  });

  if (!result) {
    await AsyncStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
  }
};
