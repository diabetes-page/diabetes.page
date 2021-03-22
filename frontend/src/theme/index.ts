import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0A5D98',
    },
    secondary: {
      main: '#40BAC3',
    },
    warning: {
      main: '#F4B251',
    },
    error: {
      main: '#F68D8F',
    },
    background: {
      default: '#F0FEFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#152E40',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
});
