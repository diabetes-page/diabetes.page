// import '@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
// import '@fullcalendar/resource-timeline/main.css'; // @fullcalendar/resource-timeline is a direct import
// import '@fullcalendar/timeline/main.css'; // @fullcalendar/resource-timeline imports @fullcalendar/timeline
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/root/state';
import { theme } from '../theme';

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS, see https://material-ui.com/guides/server-rendering/, https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>diabetes.page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
