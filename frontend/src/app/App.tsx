import { registerRootComponent } from 'expo';
import React from 'react';
import { Navigation } from '../navigation/Navigation';

function App(): JSX.Element {
  return <Navigation />;
}

registerRootComponent(App);
