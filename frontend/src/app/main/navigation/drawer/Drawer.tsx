import {
  Drawer as DrawerBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { AppBarPusher } from '../../../../components/AppBarPusher';
import { DRAWER_WIDTH } from '../../../../config/style';
import { toHomePage } from '../../../../pages';

export function Drawer(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  return (
    <DrawerBase
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <AppBarPusher />
      <List>
        <ListItem onClick={() => void router.push(toHomePage())} button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </DrawerBase>
  );
}

const useStyles = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    zIndex: 0,
  },
}));
