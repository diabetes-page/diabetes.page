import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as NativePaperDefaultTheme } from 'react-native-paper';

export const theme = {
  ...NavigationDefaultTheme,
  ...NativePaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...NativePaperDefaultTheme.colors,
    primary: '#223B59',
    text: '#223B59',
    accent: '#F4B251',
    error: '#F68D8F',
    background: '#EBFDFF',
    backdrop: '#EBFDFF',
    surface: '#FFFFFF',

    // React navigation only:
    card: '#FFFFFF',
    notification: 'green',
    border: '#E0E0E0',

    // Custom use
    grey: '#E0E0E0',
  },
};

// #EBFDFF: Background
// #223B59: Blue Hard
// #A5B9C5: Blue Soft
// #55AFC2: Cyan Hard
// #B7E2EA: Cyan Soft
// #F68D8F: Pink Hard
// #EFD6D8: Pink Soft
// #F4B251: Yellow Hard
// #EEE3C2: Yellow Soft
