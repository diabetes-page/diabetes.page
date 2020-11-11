import { Button, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Post } from '../../utilities/axios/axios';

export function Login(): JSX.Element {
  const [status, setStatus] = useState('');
  const register = useRegister(setStatus);
  const login = useLogin(setStatus);

  return (
    <View>
      <Text>Login</Text>
      <Button title="Register" onPress={register} />
      <Button title="Login" onPress={login} />
      <Text>{status}</Text>
    </View>
  );
}

const useRegister = (
  setStatus: Dispatch<SetStateAction<string>>,
): (() => void) => {
  return useCallback(() => {
    Post('/register', {
      email: 'v.rolfs@the-software-brothers.com',
      password: '88888888',
    })
      .then(() => setStatus('Register success'))
      .catch((e) => setStatus('Register error: ' + e.response.data.message));
  }, [setStatus]);
};

const useLogin = (
  setStatus: Dispatch<SetStateAction<string>>,
): (() => void) => {
  return useCallback(() => {
    Post('/login', {
      email: 'v.rolfs@the-software-brothers.com',
      password: '88888888',
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setStatus('Login success');
      })
      .catch((e) => setStatus('Login error: ' + e.response.data.message));
  }, [setStatus]);
};
