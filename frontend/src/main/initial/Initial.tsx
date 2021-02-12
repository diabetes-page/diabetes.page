import { includes } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { RootState } from '../../redux/root/state';
import { Auth } from '../auth/Auth';
import { Login } from '../login/Login';
import { Main } from '../main/Main';

export function Initial(): JSX.Element {
  const loginLoading = useSelector((state: RootState) =>
    includes(state.loading.initial, SET_LOGGED_IN),
  );
  const loggedIn = useSelector((state: RootState) => !!state.login.loggedIn);
  const theme = useTheme();
  let content: JSX.Element;

  if (loginLoading) {
    content = <Text>Loading...</Text>;
  } else if (loggedIn) {
    content = <Main />;
  } else {
    content = <Login />;
  }

  return (
    <View style={{ backgroundColor: theme.colors.backdrop, height: '100%' }}>
      <Auth />
      {content}
    </View>
  );
}
