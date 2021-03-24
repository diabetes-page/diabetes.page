import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ErrorResource } from '../utilities/requests/requests';

export type ErrorListProps<T> = {
  error: ErrorResource<T> | null;
  errorKey: keyof T;
  withMargin?: boolean;
};

export function ErrorList<T>({
  error,
  errorKey,
  withMargin = true,
}: ErrorListProps<T>): JSX.Element | null {
  const classes = useStyles();
  const className = withMargin ? classes.withMargin : undefined;

  if (!error || !error[errorKey] || error[errorKey].length === 0) {
    return null;
  }

  if (error[errorKey].length === 1) {
    return (
      <Typography color="error" className={className}>
        {error[errorKey]}.
      </Typography>
    );
  }

  return (
    <Typography color="error" component="ul" className={className}>
      {error[errorKey].map((entry) => (
        <li key={entry}>{entry}.</li>
      ))}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  withMargin: {
    marginBottom: theme.spacing(2),
  },
}));
