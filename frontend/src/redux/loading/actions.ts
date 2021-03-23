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

export const REGISTER_LOADING_REFRESHING = 'REGISTER_LOADING_REFRESHING';
export interface RegisterLoadingRefreshing {
  type: typeof REGISTER_LOADING_REFRESHING;
  action: LoadableAction;
}

export const DEREGISTER_LOADING_REFRESHING = 'DEREGISTER_LOADING_REFRESHING';
export interface DeregisterLoadingRefreshing {
  type: typeof DEREGISTER_LOADING_REFRESHING;
  action: LoadableAction;
}
