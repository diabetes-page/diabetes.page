import React from 'react';
import { Text } from 'react-native';
import { Title } from 'react-native-paper';
import { UNIT } from '../config/style';

type StandardHeadingProps = React.ComponentProps<typeof Text> & {
  children: React.ReactNode;
};
export function StandardHeading(props: StandardHeadingProps): JSX.Element {
  return (
    <Title
      {...props}
      style={[
        props.style,
        {
          fontSize: 25,
          paddingBottom: UNIT * 2,
        },
      ]}
    />
  );
}
