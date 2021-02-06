import { combineReducers } from 'redux';
import { loading } from '../loading/reducer';
import { login } from '../login/reducer';
import { user } from '../user/reducer';

export const rootReducer = combineReducers({
  user,
  loading,
  login,
});
