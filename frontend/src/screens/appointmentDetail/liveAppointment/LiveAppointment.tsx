import { Button, Text } from 'react-native';
import React, { useCallback, useReducer } from 'react';
import { Get, withAuth } from '../../../utilities/axios/axios';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Conference } from './Conference';
import {
  ConferenceContext,
  ConferenceDispatch,
} from './ConferenceContext/ConferenceContext';
import { initialState, reducer } from './ConferenceContext/state';
import { setRoomData } from './ConferenceContext/actions';

export function LiveAppointment(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const startConference = useConference(dispatch);

  return (
    <ConferenceContext.Provider value={{ state, dispatch }}>
      <Text>Live Termin</Text>

      {renderIf(!state!.room)(
        <Button title="Teilnehmen" onPress={startConference} />,

        <Conference />,
      )}
    </ConferenceContext.Provider>
  );
}

const useConference = (dispatch: ConferenceDispatch): (() => void) => {
  return useCallback(() => {
    Get('/appointments/1/conference', withAuth()).then((response) => {
      dispatch(setRoomData(response.data.room, response.data.conferenceToken));
    });
  }, [dispatch]);
};
