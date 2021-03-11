import { ServerStyleSheets } from '@material-ui/core/styles';
import { StylesProviderProps } from '@material-ui/styles/StylesProvider';
import {
  AppType,
  DocumentInitialProps,
  RenderPageResult,
} from 'next/dist/next-server/lib/utils';
import {
  default as BaseDocument,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
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

const originalGetInitialProps = Document.getInitialProps;

// See https://material-ui.com/guides/server-rendering/
// And https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/
// Note that this works with static site generation (SSG)
// For SSG, this function is only called during build time (when in production mode)
Document.getInitialProps = async (ctx): Promise<DocumentInitialProps> => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
    originalRenderPage({
      enhanceApp: (App: AppType): AppType => (
        props,
      ): React.ReactElement<StylesProviderProps> =>
        sheets.collect(<App {...props} />),
    });

  const initialProps = await originalGetInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
