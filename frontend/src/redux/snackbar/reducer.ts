import { Action } from '../root/actions';
import { SET_SNACKBAR } from './actions';
import { SnackbarState } from './state';

const initialState: SnackbarState = {
  message: '',
  variant: 'success',
};

export const snackbar = (
  state: SnackbarState = initialState,
  action: Action,
): SnackbarState => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        message: action.message,
        variant: action.variant,
      };
    default:
      return state;
  }
};
