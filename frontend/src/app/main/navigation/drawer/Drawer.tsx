import {
  Drawer as DrawerBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Event, Home } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { AppBarPusher } from '../../../../components/AppBarPusher';
import { DRAWER_WIDTH } from '../../../../config/style';
import { toHomePage } from '../../../../pages';
import { toCalendarPage } from '../../../../pages/calendar';
import { useSelector } from '../../../../redux/root/hooks';

export function Drawer(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const isConsultant = useSelector(
    (state) => state.user!.consultantId !== null,
  );

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
        {/* Home */}
        <ListItem
          onClick={() => void router.push(toHomePage())}
          selected={router.pathname === toHomePage()}
          button
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Calendar */}
        {isConsultant && (
          <ListItem
            onClick={() => void router.push(toCalendarPage())}
            selected={router.pathname === toCalendarPage()}
            button
          >
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        )}
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
