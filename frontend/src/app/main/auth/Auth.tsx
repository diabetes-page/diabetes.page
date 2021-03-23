import { includes } from 'lodash';
import React, { useEffect } from 'react';
import {
  CHECK_AUTH_INTERVAL,
  LOCAL_STORAGE_JWT_KEY,
} from '../../../config/security';
import {
  DEREGISTER_LOADING_INITIAL,
  DEREGISTER_LOADING_REFRESHING,
  REGISTER_LOADING_REFRESHING,
} from '../../../redux/loading/actions';
import { SET_LOGGED_IN } from '../../../redux/login/actions';
import {
  SafeDispatch,
  useSafeDispatch,
  useSelector,
} from '../../../redux/root/hooks';
import { SET_USER } from '../../../redux/user/actions';
import { useInterval } from '../../../utilities/hooks/hooks';
import { requests } from '../../../utilities/requests/requests';

export function Auth(): JSX.Element {
  useEstablishConnection();
  return <></>;
}

const useEstablishConnection = (): void => {
  const loadingInitial = useSelector((state) =>
    includes(state.loading.initial, SET_LOGGED_IN),
  );
  const loadingRefreshing = useSelector((state) =>
    includes(state.loading.refreshing, SET_LOGGED_IN),
  );
  const isLoggedIn = useSelector((state) => state.login?.loggedIn);
  const dispatch = useSafeDispatch();

  useEffect((): void => {
    if (loadingInitial) {
      establishConnection(true, dispatch);
    }
  }, [loadingInitial, dispatch]);

  useEffect((): void => {
    if (loadingRefreshing) {
      establishConnection(false, dispatch);
    }
  }, [loadingRefreshing, dispatch]);

  useInterval(() => {
    if (!isLoggedIn && loadingInitial && loadingRefreshing) {
      return;
    }

    dispatch({
      type: REGISTER_LOADING_REFRESHING,
      action: SET_LOGGED_IN,
    });
  }, CHECK_AUTH_INTERVAL);
};

const establishConnection = async (
  shouldFetchUser: boolean,
  dispatch: SafeDispatch,
): Promise<void> => {
  const token = await localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

  if (!token) {
    return updateLoadingState(false, dispatch);
  }

  try {
    const status = await requests.checkAuthStatus();

    if (shouldFetchUser) {
      await fetchUser(status.data.userId, dispatch);
    }
  } catch (error) {
    return updateLoadingState(false, dispatch);
  }

  return updateLoadingState(true, dispatch);
};

const fetchUser = async (
  userId: string,
  dispatch: SafeDispatch,
): Promise<void> => {
  const userResponse = await requests.showUser(userId);
  dispatch({
    type: SET_USER,
    user: userResponse.data,
  });
};

const updateLoadingState = async (
  isLoggedIn: boolean,
  dispatch: SafeDispatch,
): Promise<void> => {
  dispatch({
    type: SET_LOGGED_IN,
    loggedIn: isLoggedIn,
  });
  dispatch({
    type: DEREGISTER_LOADING_INITIAL,
    action: SET_LOGGED_IN,
  });
  dispatch({
    type: DEREGISTER_LOADING_REFRESHING,
    action: SET_LOGGED_IN,
  });

  if (!isLoggedIn) {
    await localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
  }
};
