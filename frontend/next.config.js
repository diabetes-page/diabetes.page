// For transpiling all ESM @fullcalendar/* packages
// Also, for piping fullcalendar through babel (to learn why, see babel.config.js)
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/core',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
]);

module.exports = withTM({
  // Any other general next.js settings
});
