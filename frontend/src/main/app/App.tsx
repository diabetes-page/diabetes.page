import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from '../../redux/root/store';
import { Initial } from '../initial/Initial';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Initial />
      </PaperProvider>
    </Provider>
  );
}

registerRootComponent(App);
