import { useCallback } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { Action } from './actions';

export const useDispatch = (): ((a: Action) => void) => {
  const dispatch = useReduxDispatch();

  return useCallback((a: Action) => dispatch(a), [dispatch]);
};
