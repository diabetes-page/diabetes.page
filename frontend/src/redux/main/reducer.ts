import { combineReducers } from 'redux';
import { main } from '../user/reducer';

export const mainReducer = combineReducers({
  user: main,
});
