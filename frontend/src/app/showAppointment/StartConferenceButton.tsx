import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { toShowConferencePage } from '../../pages/appointments/[appointmentId]/conference';
import {
  AppointmentResource,
  requests,
} from '../../utilities/requests/requests';

type Props = {
  appointment: AppointmentResource;
};

export function StartConferenceButton({ appointment }: Props): JSX.Element {
  const startConference = useStartConference(appointment);

  return <Button onClick={startConference}>Start appointment</Button>;
}

function useStartConference(appointment: AppointmentResource): () => void {
  const router = useRouter();

  return (): void => {
    requests.startAppointment(appointment.id).then(() =>
      router.push(
        toShowConferencePage({
          appointmentId: appointment.id,
        }),
      ),
    ); // todo: deal with request errors
  };
}
