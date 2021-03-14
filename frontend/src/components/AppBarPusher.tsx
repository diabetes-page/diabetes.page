import { makeStyles } from '@material-ui/core';
import React from 'react';
import { APP_BAR_HEIGHT } from '../config/style';

export function AppBarPusher(): JSX.Element {
  const classes = useStyles();
  return <div className={classes.appBarPusher} />;
}

const useStyles = makeStyles(() => ({
  appBarPusher: {
    height: APP_BAR_HEIGHT,
  },
}));
