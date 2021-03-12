import { Button } from '@material-ui/core';
import React from 'react';
import { AppointmentResource } from '../../utilities/requests/requests';

type Props = {
  appointment: AppointmentResource;
};

export function StartConferenceButton({ appointment }: Props): JSX.Element {
  const startConference = useStartConference(appointment);

  return <Button onClick={startConference}>Start appointment</Button>;
}

function useStartConference(appointment: AppointmentResource): () => void {
  return () => void 0;

  // const nav = useNavigation();
  //
  // return (): void => {
  //   requests
  //     .startAppointment(appointment.id)
  //     .then(() =>
  //       nav.navigate(
  //         ...stacks.appointments.screens.conference.getNavigationData(
  //           appointment.id,
  //         ),
  //       ),
  //     ); // todo: deal with request errors
  // };
}
