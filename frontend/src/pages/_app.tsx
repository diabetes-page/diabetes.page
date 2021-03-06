import DateFnsUtils from '@date-io/date-fns';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/list/main.css';
import '@fullcalendar/timegrid/main.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
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
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <Component {...pageProps} />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
