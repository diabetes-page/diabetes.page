import { Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

export type StandardHeadingProps = TypographyProps & {
  children: React.ReactNode;
};

export function StandardHeading(props: StandardHeadingProps): JSX.Element {
  return (
    <Typography variant="h3" gutterBottom {...props}>
      {props.children}
    </Typography>
  );
}
