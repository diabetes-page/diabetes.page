import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import 'strophejs-plugin-muc';
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
    <View>
      <ShowMessages messages={messages} />
      <SendMessage sendMessage={sendMessage} />
    </View>
  );
}
