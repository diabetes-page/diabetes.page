import React from 'react';
import { AppBar } from './appBar/AppBar';
import { Drawer } from './drawer/Drawer';

export function Navigation(): JSX.Element {
  return (
    <>
      <AppBar />
      <Drawer />
    </>
  );
}
