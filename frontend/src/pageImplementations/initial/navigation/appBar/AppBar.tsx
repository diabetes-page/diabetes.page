import {
  AppBar as AppBarBase,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';

export function AppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBarBase position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Permanent drawer
        </Typography>
      </Toolbar>
    </AppBarBase>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `solid 1px ${theme.palette.divider}`,
  },
}));
