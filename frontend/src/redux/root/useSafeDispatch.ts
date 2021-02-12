import { useDispatch as useReduxDispatch } from 'react-redux';
import { Action } from './actions';

export type SafeDispatch = (a: Action) => void;
export const useSafeDispatch = (): SafeDispatch => {
  const dispatch = useReduxDispatch();

  return (a: Action) => void dispatch(a);
};
