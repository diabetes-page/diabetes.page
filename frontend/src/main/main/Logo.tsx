import React from 'react';
import { Image, View } from 'react-native';
import logo from '../../../assets/logo.svg';
import { LOGO_HEIGHT, LOGO_WIDTH, UNIT } from '../../config/style';

export function Logo(): JSX.Element {
  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 2 * UNIT,
      }}
    >
      <Image source={logo} style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }} />
    </View>
  );
}
