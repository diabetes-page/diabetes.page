import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#223B59',
    },
    secondary: {
      main: '#F4B251',
    },
    error: {
      main: '#F68D8F',
    },
    background: {
      default: '#EBFDFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#223B59',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
});
