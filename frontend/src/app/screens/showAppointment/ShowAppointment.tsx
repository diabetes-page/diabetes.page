import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { StandardHeading } from '../../../components/StandardHeading';
import { StandardScreen } from '../../../components/StandardScreen';
import { useSelector } from '../../../redux/root/hooks';
import { useLoadingState } from '../../../utilities/hooks/hooks';
import { renderIf } from '../../../utilities/misc/rendering';
import {
  AppointmentResource,
  requests,
} from '../../../utilities/requests/requests';
import { JoinConferenceButton } from './JoinConferenceButton';
import { StartConferenceButton } from './StartConferenceButton';

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
  const userId = useSelector((state) => state.user.id);
  const isPresenter = appointment?.presenter.user.id === userId;

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

      <Text>Appointment is{appointment.isRunning ? ' ' : ' not '}running.</Text>

      {renderIf(appointment.isRunning)(() => (
        <JoinConferenceButton appointment={appointment} />
      ))}

      {renderIf(isPresenter && !appointment.isRunning)(() => (
        <StartConferenceButton appointment={appointment} />
      ))}
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
