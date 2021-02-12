import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { Action } from './actions';
import { RootState } from './state';

export type SafeDispatch = (action: Action) => void;
export const useSafeDispatch = (): SafeDispatch => {
  const dispatch = useReduxDispatch();

  return (action: Action) => void dispatch(action);
};

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
): TSelected => useReduxSelector<RootState, TSelected>(selector, equalityFn);
