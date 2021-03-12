import {
  Drawer as DrawerBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Inbox } from '@material-ui/icons';
import React from 'react';
import { APP_BAR_HEIGHT, DRAWER_WIDTH } from '../../../../config/style';

export function Drawer(): JSX.Element {
  const classes = useStyles();

  return (
    <DrawerBase
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.appBarPusher} />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </DrawerBase>
  );
}

const useStyles = makeStyles(() => ({
  appBarPusher: {
    height: APP_BAR_HEIGHT,
  },
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
