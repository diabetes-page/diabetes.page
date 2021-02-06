import { SET_LOGGED_IN } from '../login/actions';

export type LoadableAction = typeof SET_LOGGED_IN;

export type LoadingState = {
  initial: LoadableAction[];
  refreshing: LoadableAction[];
};
