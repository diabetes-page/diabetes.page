import {
  AppBar as AppBarBase,
  Box,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import {
  APP_BAR_HEIGHT,
  LOGO_ALT_TEXT,
  LOGO_HEIGHT,
  LOGO_PATH,
  LOGO_WIDTH,
} from '../../../../config/style';

export function AppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBarBase position="fixed" className={classes.appBar}>
      <Toolbar>
        <Box className={classes.logo}>
          <Image
            src={LOGO_PATH}
            alt={LOGO_ALT_TEXT}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
          />
        </Box>
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
  logo: {
    margin: theme.spacing(1),
  },
}));
