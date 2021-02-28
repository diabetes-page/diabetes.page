import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StandardScreen } from '../../../components/StandardScreen';
import {
  SET_APPOINTMENT,
  SET_CONFERENCE_TOKEN,
} from '../../../redux/live/actions';
import { useSafeDispatch, useSelector } from '../../../redux/root/hooks';
import { requests } from '../../../utilities/requests/requests';
import { useCreateWebSocket } from './hooks/useCreateWebSocket';
import { ConferenceWrapper } from './wrapper/ConferenceWrapper';

type ShowConferenceParams = {
  route: {
    params: {
      id: string;
    };
  };
};

export function ShowConference({ route }: ShowConferenceParams): JSX.Element {
  const isLoading = useSelector(
    (state) =>
      !state.live.conferenceToken ||
      !state.live.conference ||
      !state.live.appointment,
  );
  useLive(route.params.id);

  if (isLoading) {
    return (
      <StandardScreen>
        <ActivityIndicator animating />
      </StandardScreen>
    );
  }

  return <ConferenceWrapper />;
}

const useLive = (appointmentId: string): void => {
  useFetchConferenceToken(appointmentId);
  useFetchAppointment(appointmentId);
  useCreateWebSocket();
};

const useFetchConferenceToken = (appointmentId: string): void => {
  const dispatch = useSafeDispatch();

  useEffect(
    () =>
      void requests.showConferenceToken(appointmentId).then((response) => {
        dispatch({
          type: SET_CONFERENCE_TOKEN,
          conferenceToken: response.data.conferenceToken,
        });
      }),
    [dispatch, appointmentId],
  );
};

const useFetchAppointment = (appointmentId: string): void => {
  const dispatch = useSafeDispatch();

  useEffect(
    () =>
      void requests.showAppointment(appointmentId).then((response) => {
        dispatch({
          type: SET_APPOINTMENT,
          appointment: response.data,
        });
      }),
    [dispatch, appointmentId],
  );
};
