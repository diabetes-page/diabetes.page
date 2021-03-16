import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { StandardLoadingPage } from '../../components/StandardLoadingPage';
import { ShowConferencePageParams } from '../../pages/appointments/[appointmentId]/conference';
import {
  SET_APPOINTMENT,
  SET_CONFERENCE_TOKEN,
} from '../../redux/live/actions';
import { useSafeDispatch, useSelector } from '../../redux/root/hooks';
import { requests } from '../../utilities/requests/requests';
import { useCreateWebSocket } from './hooks/useCreateWebSocket';
import { ConferenceWrapper } from './wrapper/ConferenceWrapper';

export function ShowConference(): JSX.Element {
  const { appointmentId } = useRouter().query as ShowConferencePageParams;
  const isLoading = useSelector(
    (state) =>
      !state.live.conferenceToken ||
      !state.live.conference ||
      !state.live.appointment,
  );
  useLive(appointmentId);

  if (isLoading) {
    return <StandardLoadingPage />;
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
