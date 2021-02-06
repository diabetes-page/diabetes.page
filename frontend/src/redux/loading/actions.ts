import { LoadableAction } from './state';

export const REGISTER_LOADING_INITIAL = 'REGISTER_LOADING_INITIAL';
export interface RegisterLoadingInitial {
  type: typeof REGISTER_LOADING_INITIAL;
  action: LoadableAction;
}

export const DEREGISTER_LOADING_INITIAL = 'DEREGISTER_LOADING_INITIAL';
export interface DeregisterLoadingInitial {
  type: typeof DEREGISTER_LOADING_INITIAL;
  action: LoadableAction;
}
