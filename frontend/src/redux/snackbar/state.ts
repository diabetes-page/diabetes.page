export type SnackbarVariant = 'error' | 'success';

export type SnackbarState = {
  message: string;
  variant: SnackbarVariant;
};
