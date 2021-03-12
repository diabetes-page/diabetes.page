import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { SendMessageFunction } from './useChat';

type SendMessageProps = { sendMessage: SendMessageFunction };
export function SendMessage({ sendMessage }: SendMessageProps): JSX.Element {
  const [messageDraft, onTyping, onSendMessage] = useMessageSending(
    sendMessage,
  );
  const classes = useStyles();

  return (
    <div className={classes.sendMessageWrapper}>
      <form onSubmit={onSendMessage}>
        <Box display="flex" alignItems="center">
          <TextField onChange={onTyping} value={messageDraft} />
          <Button type="submit">Send</Button>
        </Box>
      </form>
    </div>
  );
}

const useMessageSending = (
  sendMessage: SendMessageFunction,
): [string, (event: ChangeEvent<any>) => void, (event: FormEvent) => void] => {
  const [messageDraft, setMessageDraft] = useState('');

  const onTyping = (event: ChangeEvent<any>) =>
    void setMessageDraft(event.currentTarget.value);

  const onSendMessage = (event: FormEvent): void => {
    event.preventDefault();
    sendMessage(messageDraft);
    setMessageDraft('');
  };

  return [messageDraft, onTyping, onSendMessage];
};

const useStyles = makeStyles(() => ({
  sendMessageWrapper: {
    marginTop: 'auto',
  },
}));
