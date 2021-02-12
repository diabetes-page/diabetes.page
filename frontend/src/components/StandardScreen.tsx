import React from 'react';
import { View, ViewProps } from 'react-native';
import { UNIT } from '../config/style';

type StandardScreenProps = Partial<ViewProps> & { children: JSX.Element[] };
export function StandardScreen(props: StandardScreenProps): JSX.Element {
  return (
    <View
      {...props}
      style={[
        props.style,
        {
          paddingTop: UNIT * 4,
          paddingLeft: UNIT * 8,
        },
      ]}
    />
  );
}
