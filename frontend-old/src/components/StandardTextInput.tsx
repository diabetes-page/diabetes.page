import React from 'react';
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { theme } from '../theme';

export function StandardTextInput(props: Partial<TextInputProps>): JSX.Element {
  return (
    <TextInput
      {...props}
      style={[{ backgroundColor: theme.colors.surface }, props.style]}
    />
  );
}
