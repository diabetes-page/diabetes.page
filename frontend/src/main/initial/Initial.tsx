import { includes } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root/state';
import { SET_USER } from '../../redux/user/actions';
import { Auth } from '../auth/Auth';
import { Login } from '../login/Login';
import { Navigation } from '../navigation/Navigation';

export function Initial(): JSX.Element {
  const userLoading = useSelector((state: RootState) =>
    includes(state.loading.initial, SET_USER),
  );
  const userPresent = useSelector(
    (state: RootState) => typeof state.user.id !== 'undefined',
  );
  let content: JSX.Element;

  if (userLoading) {
    content = <>Loading...</>;
  } else if (userPresent) {
    content = <Navigation />;
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
