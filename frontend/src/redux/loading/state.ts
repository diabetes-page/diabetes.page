import { SET_USER } from '../user/actions';

export type LoadableAction = typeof SET_USER;

export type LoadingState = {
  initial: LoadableAction[];
  refreshing: LoadableAction[];
};
