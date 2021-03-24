import { makeStyles, TextField, TextFieldProps } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

export type StandardTextFieldProps = TextFieldProps & {
  withMargin?: boolean;
};

export function StandardTextField(props: StandardTextFieldProps): JSX.Element {
  const margin = props.withMargin ?? false;
  const classes = useStyles();
  const className = clsx(
    props.className || null,
    margin ? classes.margin : null,
  );
  const materialProps = {
    ...props,
  };
  delete materialProps.withMargin;

  return (
    <TextField
      variant="outlined"
      fullWidth
      {...materialProps}
      className={className}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
}));
