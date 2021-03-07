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

const paramKeys = ['appointmentId'] as const;

export const ShowConferenceScreen = {
  name: 'showConference',
  url: `/appointments/:${paramKeys[0]}/conference`,
  component: ShowConference,
  makeParams: (appointmentId: string): Params => ({
    appointmentId,
  }),
};

type Params = Record<typeof paramKeys[number], string>;

type Props = {
  route: {
    params: Params;
  };
};

function ShowConference({ route }: Props): JSX.Element {
  const isLoading = useSelector(
    (state) =>
      !state.live.conferenceToken ||
      !state.live.conference ||
      !state.live.appointment,
  );
  useLive(route.params.appointmentId);

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
