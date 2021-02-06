import React, { useCallback } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/constants/constants';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { useSafeDispatch } from '../../redux/root/useSafeDispatch';
import { login } from '../../utilities/requests/requests';

export function Login(): JSX.Element {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const login = useLogin(email, password);

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        value={email}
        onChangeText={onChangeEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        value={password}
        onChangeText={onChangePassword}
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry
      />
      <Button title="Anmelden" onPress={login} />
    </View>
  );
}

const useLogin = (email: string, password: string): (() => void) => {
  const dispatch = useSafeDispatch();
  return useCallback(() => {
    login({ email, password }).then((response) => {
      localStorage.setItem(LOCAL_STORAGE_JWT_KEY, response.data.token);
      dispatch({
        type: SET_LOGGED_IN,
        loggedIn: true,
      });
    });
  }, [email, password, dispatch]);
};
