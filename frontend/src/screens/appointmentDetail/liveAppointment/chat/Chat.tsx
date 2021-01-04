import React, { useCallback, useState } from 'react';
import 'strophejs-plugin-muc';
import { useProcessMessages } from './useProcessMessages';
import { Text } from 'react-native';

export function Chat(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const displayMessage = useCallback(
    (msg: string) => setMessages([...messages, msg]),
    [messages, setMessages],
  );
  useProcessMessages(displayMessage);

  return (
    <>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
    </>
  );
}
