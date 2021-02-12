import React from 'react';
import { Image, View } from 'react-native';
import logo from '../../../assets/logo.svg';

export function Logo(): JSX.Element {
  return (
    <View style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Image
        source={logo}
        style={{ width: Math.ceil(95 / 1.4), height: Math.ceil(71 / 1.4) }}
      />
    </View>
  );
}
