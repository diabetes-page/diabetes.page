import React from 'react';
import { Text } from 'react-native';
import 'strophejs-plugin-muc';

type ShowMessagesProps = { messages: string[] };
export function ShowMessages({ messages }: ShowMessagesProps): JSX.Element {
  return (
    <>
      <Text style={{ fontWeight: 'bold' }}>Chat</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
    </>
  );
}
