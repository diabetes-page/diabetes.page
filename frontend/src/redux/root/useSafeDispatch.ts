import { useCallback } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { Action } from './actions';

export type SafeDispatch = (a: Action) => void;
export const useSafeDispatch = (): SafeDispatch => {
  const dispatch = useReduxDispatch();

  return useCallback((a: Action) => dispatch(a), [dispatch]);
};
