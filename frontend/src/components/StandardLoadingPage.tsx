import { BoxProps } from '@material-ui/core';
import React from 'react';
import { Loader } from './Loader';
import { StandardPage } from './StandardPage';

export function StandardLoadingPage(props: BoxProps): JSX.Element {
  return (
    <StandardPage {...props}>
      <Loader />
    </StandardPage>
  );
}
