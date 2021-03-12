import {
  Divider,
  Drawer as DrawerBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Inbox } from '@material-ui/icons';
import React from 'react';
import { DRAWER_WIDTH } from '../../../../config/style';

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
      <div className={classes.toolbar} />
      <Divider />
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

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
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
