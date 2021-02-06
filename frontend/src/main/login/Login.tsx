import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
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
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            onSubmitEditing={login}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={{ marginTop: '16px' }}
            error={error}
          />
          <TextInput
            style={{ marginTop: '16px' }}
            value={password}
            onChangeText={onChangePassword}
            onSubmitEditing={login}
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry
            error={error}
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
  return useCallback(() => {
    login({ email, password })
      .then((response) => {
        localStorage.setItem(LOCAL_STORAGE_JWT_KEY, response.data.token);
        dispatch({
          type: SET_LOGGED_IN,
          loggedIn: true,
        });
      })
      .catch(() => setError(true));
  }, [email, password, setError, dispatch]);
};
