import { FilledUserState } from './state';

export const SET_USER = 'SET_USER';
export interface SetUser {
  type: typeof SET_USER;
  user: FilledUserState;
}
