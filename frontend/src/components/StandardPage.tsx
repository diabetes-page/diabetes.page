import { Box, BoxProps } from '@material-ui/core';
import React from 'react';

export type StandardPageProps = BoxProps & {
  children: React.ReactNode;
};

export function StandardPage(props: BoxProps): JSX.Element {
  return <Box {...props}>{props.children}</Box>;
}
