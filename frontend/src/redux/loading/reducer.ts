import { Action } from '../root/actions';
import { LOADING_INITIAL } from './actions';
import { LoadingState } from './state';

const initialState: LoadingState = {
  initial: [],
  refreshing: [],
};

export const main = (
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
