import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './reducer';

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(logger));
