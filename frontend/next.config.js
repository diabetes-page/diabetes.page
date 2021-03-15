// For transpiling all ESM @fullcalendar/* packages
// Also, for piping fullcalendar through babel (to learn why, see babel.config.js)
const withTM = require('next-transpile-modules')([
  '@fullcalendar/core',
  '@fullcalendar/common',
  '@fullcalendar/react',
]);

module.exports = withTM({
  // Any other general next.js settings
});
