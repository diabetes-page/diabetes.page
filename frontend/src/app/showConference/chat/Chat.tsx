import { Box, makeStyles, Paper } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { CHAT_HEIGHT } from '../../../config/style';
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
  const classes = useStyles();

  return (
    <Paper className={classes.messagesBox}>
      <Box display="flex" flexDirection="column" height={CHAT_HEIGHT}>
        <ShowMessages messages={messages} />
        <SendMessage sendMessage={sendMessage} />
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles(() => ({
  messagesBox: {
    height: CHAT_HEIGHT,
  },
}));
