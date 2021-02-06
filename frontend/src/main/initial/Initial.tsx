import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root/reducer';
import { Login } from '../login/Login';
import { Navigation } from '../navigation/Navigation';

export function Initial(): JSX.Element {
  const userLoaded = useSelector((state: RootState) => !!state.user);

  if (userLoaded) {
    const content = <Navigation />;
  } else {
    const content = <Login />;
  }

  return <></>;
}
