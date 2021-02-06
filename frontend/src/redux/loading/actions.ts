import { Action } from '../root/actions';

export const LOADING_INITIAL = 'LOADING_INITIAL';
export interface LoadingInitial {
  type: typeof LOADING_INITIAL;
  action: Action;
}
