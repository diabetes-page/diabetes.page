import { Box, BoxProps, makeStyles } from '@material-ui/core';
import React from 'react';
import { AppBarPusher } from './AppBarPusher';

export function StandardPage(props: BoxProps): JSX.Element {
  const classes = useStyles();

  return (
    <Box component="main" {...props} className={classes.page}>
      <AppBarPusher />
      {props.children}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
  },
}));
