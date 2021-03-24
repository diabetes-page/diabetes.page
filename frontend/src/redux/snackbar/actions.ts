import { SnackbarVariant } from './state';

export const SET_SNACKBAR = 'SET_SNACKBAR';
export interface SetSnackbar {
  type: typeof SET_SNACKBAR;
  message: string;
  variant: SnackbarVariant;
}
