import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { CenterVertically } from '../../../../components/CenterVertically';
import { StandardTextInput } from '../../../../components/StandardTextInput';
import { theme } from '../../../../theme';
import { SendMessageFunction } from './useChat';

type SendMessageProps = { sendMessage: SendMessageFunction };
export function SendMessage({ sendMessage }: SendMessageProps): JSX.Element {
  const [messageDraft, onTyping, onPressSend, onPressEnter] = useMessageSending(
    sendMessage,
  );

  return (
    <View style={styles.sendMessageWrapper}>
      <CenterVertically>
        <StandardTextInput
          onChangeText={onTyping}
          onKeyPress={onPressEnter}
          value={messageDraft}
          style={styles.inputText}
        />
        <Button onPress={onPressSend}>Send</Button>
      </CenterVertically>
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
      event.preventDefault();
      onPressSend();
    }
  };

  return [messageDraft, onTyping, onPressSend, onPressEnter];
};

const styles = StyleSheet.create({
  sendMessageWrapper: {
    marginTop: 'auto',
  },
  inputText: {
    backgroundColor: theme.colors.grey,
  },
});
