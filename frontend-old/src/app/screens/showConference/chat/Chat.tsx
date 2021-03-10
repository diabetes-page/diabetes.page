import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { CHAT_HEIGHT } from '../../../../config/style';
import { SendMessage } from './SendMessage';
import { ShowMessages } from './ShowMessages';
import { useChat } from './useChat';

export function Chat(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const displayMessage = useCallback(
    (msg: string) => void setMessages([...messages, msg]),
    [setMessages, messages],
  );
  const sendMessage = useChat(displayMessage);

  return (
    <Card style={styles.messagesBox}>
      <View style={styles.messagesWrapper}>
        <ShowMessages messages={messages} />
        <SendMessage sendMessage={sendMessage} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  messagesBox: {
    height: CHAT_HEIGHT,
  },
  messagesWrapper: {
    height: CHAT_HEIGHT,
    flexDirection: 'column',
  },
});
