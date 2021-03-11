import { Action } from '../root/actions';
import { SET_USER } from './actions';
import { UserState } from './state';

const initialState: UserState = {};

export const user = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};
