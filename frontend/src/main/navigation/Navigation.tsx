import React from 'react';
import { AppBar } from './appBar/AppBar';
import { AppDrawer } from './appDrawer/AppDrawer';

export function Navigation(): JSX.Element {
  return (
    <>
      <AppBar />
      <AppDrawer />
    </>
  );
}
