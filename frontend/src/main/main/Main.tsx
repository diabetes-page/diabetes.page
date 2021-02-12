import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { APPBAR_HEIGHT } from '../../config/style';
import { theme } from '../../theme';
import { Navigation } from '../navigation/Navigation';
import { Logo } from './Logo';

export function Main(): JSX.Element {
  return (
    <>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title={<Logo />} />
      </Appbar.Header>
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.surface,
    height: APPBAR_HEIGHT,
    borderColor: theme.colors.border,
    borderBottomWidth: 1,
  },
});
