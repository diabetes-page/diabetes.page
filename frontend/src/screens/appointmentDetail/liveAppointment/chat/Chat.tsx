import React, { useCallback, useState } from 'react';
import 'strophejs-plugin-muc';
import { useProcessMessages } from './useProcessMessages';
import { Button, Text, TextInput, View } from 'react-native';
import { useSendMessage } from '../utilities/hooks/useSendMessage';

export function Chat(): JSX.Element {
  const [onInputChange, onSendMessage] = useOnSendMessage();
  const [messages, setMessages] = useState<string[]>([]);
  const displayMessage = useCallback(
    (msg: string) => setMessages([...messages, msg]),
    [messages, setMessages],
  );
  useProcessMessages(displayMessage);

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Chat</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TextInput
          style={{ backgroundColor: 'white' }}
          onChangeText={onInputChange}
        />
        <Button title="Absenden" onPress={onSendMessage} />
      </View>
    </View>
  );
}

const useOnSendMessage = (): [(text: string) => void, () => void] => {
  const [input, setInput] = useState('');
  const sendMessage = useSendMessage();
  const onInputChange = useCallback((text) => setInput(text), [setInput]);
  const onSendMessage = useCallback(() => sendMessage(input), [
    sendMessage,
    input,
  ]);

  return [onInputChange, onSendMessage];
};
