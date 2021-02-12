import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from '../../redux/root/state';
import { theme } from '../../theme';
import { Initial } from '../initial/Initial';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Initial />
      </PaperProvider>
    </Provider>
  );
}

registerRootComponent(App);
