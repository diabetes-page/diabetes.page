import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { toShowConferencePage } from '../../pages/appointments/[appointmentId]/conference';
import { AppointmentResource } from '../../utilities/requests/requests';

type Props = {
  appointment: AppointmentResource;
};

export function JoinConferenceButton({ appointment }: Props): JSX.Element {
  const joinConference = useJoinConference(appointment);

  return <Button onClick={joinConference}>Join</Button>;
}

function useJoinConference(appointment: AppointmentResource): () => void {
  const router = useRouter();

  return (): void => {
    router.push(
      toShowConferencePage({
        appointmentId: appointment.id,
      }),
    );
  };
}
