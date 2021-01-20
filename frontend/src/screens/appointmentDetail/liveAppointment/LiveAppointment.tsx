import React, { useCallback, useMemo, useReducer } from 'react';
import { Button } from 'react-native';
import { Get, withAuth } from '../../../utilities/axios/axios';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Conference } from './Conference';
import { initConference } from './utilities/conferenceContext/actions';
import {
  ConferenceContext,
  ConferenceDispatch,
} from './utilities/conferenceContext/ConferenceContext';
import { initialState, reducer } from './utilities/conferenceContext/state';

export function LiveAppointment(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const startConference = useConference(dispatch);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ConferenceContext.Provider value={contextValue}>
      {renderIf(state!.conferenceRoom === undefined)(
        () => (
          <Button title="Teilnehmen" onPress={startConference} />
        ),

        () => (
          <Conference />
        ),
      )}
    </ConferenceContext.Provider>
  );
}

const useConference = (dispatch: ConferenceDispatch): (() => void) => {
  return useCallback(() => {
    Get('/appointments/1/conference', withAuth()).then((response) => {
      const {
        conferenceRoom,
        conferenceToken,
        presentationIndex,
        officialMessagePublicKey,
        conferenceUpdateCounter,
      } = response.data;
      dispatch(
        initConference(
          conferenceRoom,
          conferenceToken,
          presentationIndex,
          officialMessagePublicKey,
          conferenceUpdateCounter,
        ),
      );
    });
  }, [dispatch]);
};
