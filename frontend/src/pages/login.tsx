import React from 'react';
import { Login } from '../app/login/Login';
import { Main } from '../app/main/Main';

export function toLoginPage(): string {
  return '/login';
}

export default function LoginPage(): JSX.Element {
  return (
    <Main requiresAuth={false}>
      <Login />
    </Main>
  );
}
