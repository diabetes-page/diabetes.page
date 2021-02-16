import {
  CombinedState,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from 'redux';
import { conference } from '../conference/reducer';
import { loading } from '../loading/reducer';
import { login } from '../login/reducer';
import { user } from '../user/reducer';
import { Action, RESET_REDUX } from './actions';

function combineReducersWithReset<S>(
  reducers: ReducersMapObject<S, Action>,
): Reducer<CombinedState<S>, Action> {
  const combinedReducers = combineReducers(reducers);

  return function (state: S | undefined = undefined, action: Action): S {
    if (action.type == RESET_REDUX) {
      return combinedReducers(undefined, action);
    }

    return combinedReducers(state, action);
  };
}

export const rootReducer = combineReducersWithReset({
  loading,
  login,
  user,
  conference,
});
