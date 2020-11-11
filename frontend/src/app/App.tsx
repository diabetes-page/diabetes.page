import React from 'react';
import { registerRootComponent } from 'expo';
import { Navigation } from '../navigation/Navigation';

function App(): JSX.Element {
  return <Navigation />;
}

registerRootComponent(App);
