// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require('next-transpile-modules')([
  '@fullcalendar/core',
  '@fullcalendar/react',
]);

module.exports = withTM({
  // any other general next.js settings
});
