import React, { useCallback, useState } from 'react';
import 'strophejs-plugin-muc';
import { useProcessMessages } from './useProcessMessages';

export function Chat(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const displayMessage = useCallback(
    (msg: string) => setMessages([...messages, msg]),
    [messages, setMessages],
  );
  useProcessMessages(displayMessage);

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
}
