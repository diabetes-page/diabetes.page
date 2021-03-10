import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import logo from '../../../../assets/logo.svg';
import { LOGO_HEIGHT, LOGO_WIDTH, UNIT } from '../../../config/style';

export function Logo(): JSX.Element {
  return (
    <View style={styles.logoWrapper}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 2 * UNIT,
  },
  logo: { width: LOGO_WIDTH, height: LOGO_HEIGHT },
});
