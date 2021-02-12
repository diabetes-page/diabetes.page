import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Title, useTheme } from 'react-native-paper';
import { StandardTextInput } from '../../components/StandardTextInput';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/constants/constants';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { useSafeDispatch } from '../../redux/root/useSafeDispatch';
import { renderIf } from '../../utilities/misc/rendering';
import { login } from '../../utilities/requests/requests';

export function Login(): JSX.Element {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const login = useLogin(email, password, setError);
  const theme = useTheme();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <View style={{ width: '25%' }}>
        <Title>Login</Title>
        <View>
          <StandardTextInput
            label="Email"
            value={email}
            onChangeText={onChangeEmail}
            onSubmitEditing={login}
            error={error}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={{
              marginTop: '16px',
            }}
          />
          <StandardTextInput
            label="Password"
            value={password}
            onChangeText={onChangePassword}
            onSubmitEditing={login}
            error={error}
            autoCompleteType="password"
            textContentType="password"
            style={{ marginTop: '16px' }}
            secureTextEntry
          />

          {renderIf(error)(() => (
            <Paragraph style={{ color: theme.colors.error }}>
              The email and password you entered did not match our records.
            </Paragraph>
          ))}

          <Button
            onPress={login}
            mode="contained"
            style={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
}

const useLogin = (
  email: string,
  password: string,
  setError: (v: boolean) => void,
): (() => void) => {
  const dispatch = useSafeDispatch();

  function onLogin(response: AxiosResponse): void {
    AsyncStorage.setItem(LOCAL_STORAGE_JWT_KEY, response.data.token);
    dispatch({
      type: SET_LOGGED_IN,
      loggedIn: true,
    });
  }

  return () =>
    void login({ email, password })
      .then(onLogin)
      .catch(() => setError(true)); // Todo: Deal with other types of errors
};
