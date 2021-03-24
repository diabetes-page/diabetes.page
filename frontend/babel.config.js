module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // See https://nextjs.org/docs/advanced-features/customizing-babel-config
        exclude: ['transform-typeof-symbol'],
        include: [
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
        ],
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],

  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: true,
        absoluteRuntime: '@babel/runtime',
      },
    ],
  ],

  // fullcalendar attempts to import its own CSS files, but next.js does not allow this.
  // throw away these statements before they arrive at next.js,
  // but you'll need to import them manually in pages/_app.jsx.
  // will also work for any other 3rd-party packages that attempt to do this.
  overrides: [
    {
      include: ['./node_modules'],
      plugins: [
        [
          'babel-plugin-transform-require-ignore',
          {
            extensions: ['.css'],
          },
        ],
      ],
    },
  ],
};
