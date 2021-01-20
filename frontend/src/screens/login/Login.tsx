import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Post, withAuth } from '../../utilities/axios/axios';

export function Login(): JSX.Element {
  const [status, setStatus] = useState('');
  const register = useRegister(setStatus);
  const login = useLogin(setStatus);
  const createAppointment = useCreateAppointment(setStatus);

  return (
    <View>
      <Text>Login</Text>
      <Button title="Registrieren" onPress={register} />
      <Button title="Anmelden" onPress={login} />
      <Button title="Erstelle Termin" onPress={createAppointment} />
      <Text>{status}</Text>
    </View>
  );
}

const useRegister = (
  setStatus: Dispatch<SetStateAction<string>>,
): (() => void) => {
  return useCallback(() => {
    Post('/register', {
      name: 'Vincent Rolfs',
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

const useCreateAppointment = (
  setStatus: Dispatch<SetStateAction<string>>,
): (() => void) => {
  return useCallback(() => {
    Post('/appointments', {}, withAuth())
      .then((response) =>
        setStatus('Appointment created with id: ' + response.data.id),
      )
      .catch((e) =>
        setStatus('Appointment creation error: ' + e.response.data.message),
      );
  }, [setStatus]);
};
