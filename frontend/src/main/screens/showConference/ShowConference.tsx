import React, { useEffect, useMemo, useReducer } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StandardScreen } from '../../../components/StandardScreen';
import { renderIf } from '../../../utilities/misc/rendering';
import { requests } from '../../../utilities/requests/requests';
import { initConference } from './utilities/conferenceContext/actions';
import {
  ConferenceContext,
  ConferenceDispatch,
} from './utilities/conferenceContext/ConferenceContext';
import { initialState, reducer } from './utilities/conferenceContext/state';
import { ConferenceWrapper } from './wrapper/ConferenceWrapper';

type ShowConferenceParams = {
  route: {
    params: {
      id: number;
    };
  };
};
export function ShowConference({ route }: ShowConferenceParams): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useConference(dispatch, route.params.id);

  return (
    <ConferenceContext.Provider value={contextValue}>
      {renderIf(state!.conferenceRoom === undefined)(
        () => (
          <StandardScreen>
            <ActivityIndicator animating />
          </StandardScreen>
        ),

        () => (
          <ConferenceWrapper />
        ),
      )}
    </ConferenceContext.Provider>
  );
}

const useConference = (
  dispatch: ConferenceDispatch,
  appointmentId: number,
): void => {
  return useEffect(
    () =>
      void requests.showConferenceData(appointmentId).then((response) => {
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
      }),
    [dispatch, appointmentId],
  );
};
