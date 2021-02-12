import { useDispatch as useReduxDispatch } from 'react-redux';
import { Action } from './actions';

export type SafeDispatch = (action: Action) => void;
export const useSafeDispatch = (): SafeDispatch => {
  const dispatch = useReduxDispatch();

  return (action: Action) => void dispatch(action);
};
