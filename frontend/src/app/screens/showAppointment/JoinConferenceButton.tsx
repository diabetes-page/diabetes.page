import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native-paper';
import { AppointmentResource } from '../../../utilities/requests/requests';
import { stacks } from '../../navigation/config';

type Props = {
  appointment: AppointmentResource;
};

export function JoinConferenceButton({ appointment }: Props): JSX.Element {
  const joinConference = useJoinConference(appointment);

  return <Button onPress={joinConference}>Join</Button>;
}

function useJoinConference(appointment: AppointmentResource): () => void {
  const nav = useNavigation();

  return (): void => {
    nav.navigate(
      ...stacks.appointments.screens.conference.getNavigationData(
        appointment.id,
      ),
    );
  };
}
