import { Action } from '../root/actions';
import { SET_USER } from '../user/actions';
import { LOADING_INITIAL } from './actions';
import { LoadingState } from './state';

const initialState: LoadingState = {
  initial: [SET_USER],
  refreshing: [],
};

export const loading = (
  state: LoadingState = initialState,
  action: Action,
): LoadingState => {
  switch (action.type) {
    case LOADING_INITIAL:
      return {
        ...state,
        initial: [...state.initial, action.action],
      };
    default:
      return state;
  }
};
