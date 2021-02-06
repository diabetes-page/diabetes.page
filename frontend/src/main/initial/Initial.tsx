import { includes } from 'lodash';
import React from 'react';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { RootState } from '../../redux/root/state';
import { Auth } from '../auth/Auth';
import { Login } from '../login/Login';
import { Navigation } from '../navigation/Navigation';

export function Initial(): JSX.Element {
  const loginLoading = useSelector((state: RootState) =>
    includes(state.loading.initial, SET_LOGGED_IN),
  );
  const loggedIn = useSelector((state: RootState) => !!state.login.loggedIn);
  let content: JSX.Element;

  if (loginLoading) {
    content = <Text>Loading...</Text>;
  } else if (loggedIn) {
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
