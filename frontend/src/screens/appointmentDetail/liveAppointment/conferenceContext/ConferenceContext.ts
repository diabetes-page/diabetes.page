import React, { Dispatch, ReducerAction } from 'react';
import { ConferenceState, reducer } from './state';

export type ConferenceDispatch = Dispatch<ReducerAction<typeof reducer>>;
export type ConferenceControls =
  | {
      state: ConferenceState;
      dispatch: ConferenceDispatch;
    }
  | undefined;
export const ConferenceContext = React.createContext<ConferenceControls>(
  undefined,
);
