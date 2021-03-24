import { IconButton, makeStyles, SnackbarContent } from '@material-ui/core';
import MuiSnackbar from '@material-ui/core/Snackbar';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useSafeDispatch, useSelector } from '../../../redux/root/hooks';
import { SET_SNACKBAR } from '../../../redux/snackbar/actions';

export function Snackbar(): JSX.Element {
  const classes = useStyles();
  const dispatch = useSafeDispatch();
  const message = useSelector((state) => state.snackbars.message);
  const variant = useSelector((state) => state.snackbars.variant);
  const onClose = () =>
    void dispatch({
      type: SET_SNACKBAR,
      message: '',
      variant: variant,
    });

  return (
    <>
      <MuiSnackbar
        open={message !== ''}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <SnackbarContent
          className={classes[variant]}
          message={message}
          action={
            <IconButton aria-label="close" onClick={onClose}>
              <Close />
            </IconButton>
          }
        />
      </MuiSnackbar>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
}));
