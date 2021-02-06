import { Action } from '../root/actions';

export type LoadingState = {
  initial: Action[];
  refreshing: Action[];
};
