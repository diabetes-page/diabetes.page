import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UNIT } from '../../../../config/style';

type ShowMessagesProps = { messages: string[] };
export function ShowMessages({ messages }: ShowMessagesProps): JSX.Element {
  return (
    <View style={styles.showMessageWrapper}>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  showMessageWrapper: {
    padding: UNIT * 2,
    flex: 1,
    overflowY: 'auto',
  },
});
