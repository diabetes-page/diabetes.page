import { combineReducers } from 'redux';
import { main } from '../user/reducer';

export const rootReducer = combineReducers({
  user: main,
});
