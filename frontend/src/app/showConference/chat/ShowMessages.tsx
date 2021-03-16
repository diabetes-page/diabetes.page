import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

type ShowMessagesProps = { messages: string[] };
export function ShowMessages({ messages }: ShowMessagesProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.showMessagesWrapper}>
      {messages.map((message, index) => (
        <Typography key={index}>{message}</Typography>
      ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  showMessagesWrapper: {
    padding: theme.spacing(2),
    flex: 1,
    overflowY: 'auto',
  },
}));
