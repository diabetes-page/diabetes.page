import { includes } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { RootState } from '../../redux/root/state';
import { Auth } from './auth/Auth';
import { Loading } from './loading/Loading';
import { Login } from './login/Login';

export function Initial(): JSX.Element {
  const loginLoading = useSelector((state: RootState) =>
    includes(state.loading.initial, SET_LOGGED_IN),
  );
  const loggedIn = useSelector((state: RootState) => !!state.login.loggedIn);
  let content: JSX.Element;

  if (loginLoading) {
    content = <Loading />;
  } else if (loggedIn) {
    content = <Loading />;
  } else {
    content = <Login />;
  }

  return (
    <>
      <Auth />
      {content}
    </>
  );
}
