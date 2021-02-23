import React, { useState } from 'react';
import {
  Button,
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import 'strophejs-plugin-muc';
import { SendMessageFunction } from './useChat';

type SendMessageProps = { sendMessage: SendMessageFunction };
export function SendMessage({ sendMessage }: SendMessageProps): JSX.Element {
  const [messageDraft, onTyping, onPressSend, onPressEnter] = useMessageSending(
    sendMessage,
  );

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <TextInput
        style={{ backgroundColor: 'white' }}
        onChangeText={onTyping}
        onKeyPress={onPressEnter}
        value={messageDraft}
      />
      <Button title="Send" onPress={onPressSend} />
    </View>
  );
}

type KeyPressEvent = NativeSyntheticEvent<TextInputKeyPressEventData>;

const useMessageSending = (
  sendMessage: SendMessageFunction,
): [
  string,
  (text: string) => void,
  () => void,
  (event: KeyPressEvent) => void,
] => {
  const [messageDraft, setMessageDraft] = useState('');

  const onTyping = (text: string) => void setMessageDraft(text);
  const onPressSend = (): void => {
    // Todo: Keep focus on text field
    sendMessage(messageDraft);
    setMessageDraft('');
  };
  const onPressEnter = (event: KeyPressEvent): void => {
    if (event.nativeEvent.key === 'Enter') {
      onPressSend();
    }
  };

  return [messageDraft, onTyping, onPressSend, onPressEnter];
};
