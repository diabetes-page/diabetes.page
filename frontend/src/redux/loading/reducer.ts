import { reject } from 'lodash';
import { Action } from '../root/actions';
import { SET_USER } from '../user/actions';
import {
  DEREGISTER_LOADING_INITIAL,
  REGISTER_LOADING_INITIAL,
} from './actions';
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
    case REGISTER_LOADING_INITIAL:
      return {
        ...state,
        initial: [...state.initial, action.action],
      };
    case DEREGISTER_LOADING_INITIAL:
      return {
        ...state,
        initial: reject(
          state.initial,
          (someAction) => someAction === action.action,
        ),
      };
    default:
      return state;
  }
};
