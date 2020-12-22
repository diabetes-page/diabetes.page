import { Button, Text } from 'react-native';
import React, { useCallback, useMemo, useReducer } from 'react';
import { Get, withAuth } from '../../../utilities/axios/axios';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Conference } from './Conference';
import {
  ConferenceContext,
  ConferenceDispatch,
} from './utilities/conferenceContext/ConferenceContext';
import { initialState, reducer } from './utilities/conferenceContext/state';
import { initConference } from './utilities/conferenceContext/actions';

export function LiveAppointment(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const startConference = useConference(dispatch);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ConferenceContext.Provider value={contextValue}>
      <Text>Live Termin</Text>

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
      } = response.data;
      dispatch(
        initConference(conferenceRoom, conferenceToken, presentationIndex),
      );
    });
  }, [dispatch]);
};
