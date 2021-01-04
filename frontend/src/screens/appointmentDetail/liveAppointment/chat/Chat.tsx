import React, { useCallback, useState } from 'react';
import 'strophejs-plugin-muc';
import { useProcessMessages } from './useProcessMessages';
import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { useSendMessage } from '../utilities/hooks/useSendMessage';

export function Chat(): JSX.Element {
  const [input, onInputChange, onButtonPress, onKeyPress] = useOnSendMessage();
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
          onKeyPress={onKeyPress}
          value={input}
        />
        <Button title="Absenden" onPress={onButtonPress} />
      </View>
    </View>
  );
}

const useOnSendMessage = (): [
  string,
  (text: string) => void,
  () => void,
  (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void,
] => {
  const [input, setInput] = useState('');
  const sendMessage = useSendMessage();
  const onInputChange = useCallback((text) => setInput(text), [setInput]);
  const onButtonPress = useCallback(() => {
    // Todo: Keep focus on text field
    sendMessage(input);
    setInput('');
  }, [sendMessage, input, setInput]);
  const onKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (event.nativeEvent.key === 'Enter') {
        onButtonPress();
      }
    },
    [onButtonPress],
  );

  return [input, onInputChange, onButtonPress, onKeyPress];
};
