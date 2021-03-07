import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StandardHeading } from '../../../components/StandardHeading';
import { StandardScreen } from '../../../components/StandardScreen';
import { useLoadingState } from '../../../utilities/hooks/hooks';
import {
  AppointmentResource,
  requests,
} from '../../../utilities/requests/requests';

const paramKeys = ['appointmentId'] as const;

export const ShowAppointmentScreen = {
  name: 'showAppointment',
  url: `/appointments/:${paramKeys[0]}`,
  component: ShowAppointment,
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

function ShowAppointment({ route }: Props): JSX.Element {
  const [appointment, loading] = useFetchAppointment(
    route.params.appointmentId,
  );

  if (loading || !appointment) {
    return (
      <StandardScreen>
        <ActivityIndicator animating />
      </StandardScreen>
    );
  }

  return (
    <StandardScreen>
      <StandardHeading>
        {appointment.training?.name ?? 'Appointment'}
      </StandardHeading>
    </StandardScreen>
  );
}

const useFetchAppointment = (
  appointmentId: string,
): [AppointmentResource | undefined, boolean] => {
  const [
    appointment,
    setAppointment,
    loading,
  ] = useLoadingState<AppointmentResource>();

  useEffect(
    () =>
      void requests.showAppointment(appointmentId).then((response) => {
        setAppointment(response.data);
      }), // todo: deal with request errors
    [appointmentId, setAppointment],
  );

  return [appointment, loading];
};
