import { LoadableAction } from './state';

export const LOADING_INITIAL = 'LOADING_INITIAL';
export interface LoadingInitial {
  type: typeof LOADING_INITIAL;
  action: LoadableAction;
}
