import { AppBar as AppBarBase, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { APP_BAR_HEIGHT } from '../../../../config/style';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';

export function AppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBarBase position="fixed" className={classes.appBar}>
      <Toolbar>
        <Logo />
        <UserMenu />
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
    height: APP_BAR_HEIGHT,
  },
}));
