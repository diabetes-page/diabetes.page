import React from 'react';
import { View, ViewProps } from 'react-native';
import { UNIT } from '../config/style';

type StandardScreenProps = Partial<ViewProps> & { children: React.ReactNode };
export function StandardScreen(props: StandardScreenProps): JSX.Element {
  return (
    <View
      {...props}
      style={[
        {
          paddingTop: UNIT * 4,
          paddingLeft: UNIT * 8,
          paddingRight: UNIT * 8,
        },
        props.style,
      ]}
    />
  );
}
