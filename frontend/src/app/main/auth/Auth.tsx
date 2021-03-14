import { StatusCodes } from 'http-status-codes';
import React, { useEffect } from 'react';
import { LOCAL_STORAGE_JWT_KEY } from '../../../config/security';
import { DEREGISTER_LOADING_INITIAL } from '../../../redux/loading/actions';
import { SET_LOGGED_IN } from '../../../redux/login/actions';
import {
  SafeDispatch,
  useSafeDispatch,
  useSelector,
} from '../../../redux/root/hooks';
import { SET_USER } from '../../../redux/user/actions';
import { handleStatusError } from '../../../utilities/misc/errors';
import { requests } from '../../../utilities/requests/requests';

export function Auth(): JSX.Element {
  useEstablishConnection();
  return <></>;
}

const useEstablishConnection = (): void => {
  const loading = useSelector(
    (state) => state.loading.initial.indexOf(SET_LOGGED_IN) !== -1,
  );
  const dispatch = useSafeDispatch();

  useEffect((): void => {
    if (loading) {
      establishConnection(dispatch);
    }
  }, [loading, dispatch]);
};

const establishConnection = async (dispatch: SafeDispatch): Promise<void> => {
  // Todo: Don't use AsyncStorage, as it is insecure
  const token = await localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

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
    type: SET_LOGGED_IN,
    loggedIn: result,
  });
  dispatch({
    type: DEREGISTER_LOADING_INITIAL,
    action: SET_LOGGED_IN,
  });

  if (!result) {
    await localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
  }
};
