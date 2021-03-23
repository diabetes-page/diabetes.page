import { Box, Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { Icon } from '../../../../components/Icon';
import { LOCAL_STORAGE_JWT_KEY } from '../../../../config/security';
import { RESET_REDUX } from '../../../../redux/root/actions';
import { useSafeDispatch, useSelector } from '../../../../redux/root/hooks';
import { useMenu } from '../../../../utilities/hooks/hooks';

export function UserMenu(): JSX.Element {
  const classes = useStyles();
  const { open, anchorEl, onMenuOpen, onMenuClose } = useMenu();
  const name = useSelector((state) => state.user!.name);
  const logout = useLogout();

  return (
    <Box width="100%" display="flex">
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={onMenuOpen}
        className={classes.userName}
      >
        <Icon icon={AccountCircle} pos="left" />
        {name}
      </Button>
      <Menu
        aria-controls="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onMenuClose}
        keepMounted
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

const useLogout = (): (() => Promise<void>) => {
  const dispatch = useSafeDispatch();

  return async (): Promise<void> => {
    await localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
    dispatch({
      type: RESET_REDUX,
    });
  };
};

const useStyles = makeStyles(() => ({
  userName: {
    marginLeft: 'auto',
  },
}));
