import { Button } from '@material-ui/core';
import React from 'react';
import { AppointmentResource } from '../../utilities/requests/requests';

type Props = {
  appointment: AppointmentResource;
};

export function JoinConferenceButton({ appointment }: Props): JSX.Element {
  const joinConference = useJoinConference(appointment);

  return <Button onClick={joinConference}>Join</Button>;
}

function useJoinConference(appointment: AppointmentResource): () => void {
  return () => void 0;
  // const nav = useNavigation();
  //
  // return (): void => {
  //   nav.navigate(
  //     ...stacks.appointments.screens.conference.getNavigationData(
  //       appointment.id,
  //     ),
  //   );
  // };
}
