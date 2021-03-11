import BaseDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { theme } from '../theme';

export default class Document extends BaseDocument {
  // todo: Set HTML lang attribute

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
