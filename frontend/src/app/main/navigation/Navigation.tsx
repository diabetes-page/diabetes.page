import React, { ReactNode } from 'react';
import { AppBar } from './appBar/AppBar';
import { Drawer } from './drawer/Drawer';

type Props = {
  children: ReactNode;
};

export function Navigation({ children }: Props): JSX.Element {
  return (
    <>
      <AppBar />
      <Drawer />
      {children}
    </>
  );
}
