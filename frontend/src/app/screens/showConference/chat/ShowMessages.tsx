import React from 'react';
import { StyleSheet, Text } from 'react-native';
import 'strophejs-plugin-muc';

type ShowMessagesProps = { messages: string[] };
export function ShowMessages({ messages }: ShowMessagesProps): JSX.Element {
  return (
    <>
      <Text style={styles.heading}>Chat</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  heading: { fontWeight: 'bold' },
});
