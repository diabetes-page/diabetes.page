import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native-paper';
import {
  AppointmentResource,
  requests,
} from '../../../utilities/requests/requests';
import { stacks } from '../../navigation/config';

type Props = {
  appointment: AppointmentResource;
};

export function StartConferenceButton({ appointment }: Props): JSX.Element {
  const startConference = useStartConference(appointment);

  return <Button onPress={startConference}>Start appointment</Button>;
}

function useStartConference(appointment: AppointmentResource): () => void {
  const nav = useNavigation();

  return (): void => {
    requests
      .startAppointment(appointment.id)
      .then(() =>
        nav.navigate(
          stacks.appointments.screens.conference.name,
          stacks.appointments.screens.conference.makeParams(appointment.id),
        ),
      ); // todo: deal with request errors
  };
}
