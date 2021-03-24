import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ErrorResource } from '../utilities/requests/requests';

export type ErrorListProps = {
  error: ErrorResource | null;
  errorKey: string;
  withMargin?: boolean;
};

export function ErrorList({
  error,
  errorKey,
  withMargin = true,
}: ErrorListProps): JSX.Element | null {
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
