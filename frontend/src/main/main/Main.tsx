import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { APPBAR_HEIGHT } from '../../config/style';
import { theme } from '../../theme';
import { Navigation } from '../navigation/Navigation';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';

export function Main(): JSX.Element {
  return (
    <>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title={<Logo />} />
        <Appbar.Content
          title={<UserMenu />}
          style={{ alignItems: 'flex-end' }}
        />
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
