import { Action } from '../main/actions';

export type UserState = void | null;
const initialState: UserState = null;

export const main = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  return state;
};
