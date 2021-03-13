import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};
export function CenterVertically({ children }: Props): JSX.Element {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {children}
    </View>
  );
}
