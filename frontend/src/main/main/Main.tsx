import React from 'react';
import { Appbar } from 'react-native-paper';
import { theme } from '../../theme';
import { Navigation } from '../navigation/Navigation';
import { Logo } from './Logo';

export function Main(): JSX.Element {
  return (
    <>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={<Logo />} />
      </Appbar.Header>
      <Navigation />
    </>
  );
}
