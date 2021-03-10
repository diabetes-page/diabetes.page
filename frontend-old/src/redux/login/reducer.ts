import { Action } from '../root/actions';
import { SET_LOGGED_IN } from './actions';
import { LoginState } from './state';

const initialState: LoginState = {};

export const login = (
  state: LoginState = initialState,
  action: Action,
): LoginState => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    default:
      return state;
  }
};
