import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardTextInput } from '../../components/StandardTextInput';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/security';
import { UNIT } from '../../config/style';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { useSafeDispatch } from '../../redux/root/hooks';
import { SET_USER } from '../../redux/user/actions';
import { theme } from '../../theme';
import { renderIf } from '../../utilities/misc/rendering';
import { LoginResource, requests } from '../../utilities/requests/requests';

export function Login(): JSX.Element {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const login = useLogin(email, password, setError);

  return (
    <View style={styles.centeringBox}>
      <View style={styles.sizeBox}>
        <StandardHeading>Login</StandardHeading>
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
            style={styles.inputElement}
          />
          <StandardTextInput
            label="Password"
            value={password}
            onChangeText={onChangePassword}
            onSubmitEditing={login}
            error={error}
            autoCompleteType="password"
            textContentType="password"
            style={styles.inputElement}
            secureTextEntry
          />

          {renderIf(error)(() => (
            <Paragraph style={[styles.inputElement, styles.errorInfo]}>
              The email and password you entered did not match our records.
            </Paragraph>
          ))}

          <Button onPress={login} mode="contained" style={styles.inputElement}>
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

  function onLogin(response: AxiosResponse<LoginResource>): void {
    AsyncStorage.setItem(LOCAL_STORAGE_JWT_KEY, response.data.token);
    dispatch({
      type: SET_USER,
      user: response.data.user,
    });
    dispatch({
      type: SET_LOGGED_IN,
      loggedIn: true,
    });
  }

  return () =>
    void requests
      .login({ email, password })
      .then(onLogin)
      .catch(() => setError(true)); // Todo: Deal with other types of errors
};

const styles = StyleSheet.create({
  centeringBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  sizeBox: { width: '40%' },
  inputElement: { marginBottom: UNIT * 2 },
  errorInfo: { color: theme.colors.error },
});
