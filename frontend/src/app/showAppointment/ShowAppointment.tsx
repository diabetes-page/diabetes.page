import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardLoadingPage } from '../../components/StandardLoadingPage';
import { StandardPage } from '../../components/StandardPage';
import { ShowAppointmentPageParams } from '../../pages/appointments/[appointmentId]';
import { useSelector } from '../../redux/root/hooks';
import { useLoadingState } from '../../utilities/hooks/hooks';
import { renderIf } from '../../utilities/misc/rendering';
import {
  AppointmentResource,
  requests,
} from '../../utilities/requests/requests';
import { JoinConferenceButton } from './JoinConferenceButton';
import { StartConferenceButton } from './StartConferenceButton';

export function ShowAppointment(): JSX.Element {
  const { appointmentId } = useRouter().query as ShowAppointmentPageParams;
  const [appointment, loading] = useFetchAppointment(appointmentId);
  const userId = useSelector((state) => state.user.id);
  const isPresenter = appointment?.presenter.user.id === userId;

  if (loading || !appointment) {
    return <StandardLoadingPage />;
  }

  return (
    <StandardPage>
      <StandardHeading>
        {appointment.training?.name ?? 'Appointment'}
      </StandardHeading>

      <Typography color="textSecondary">
        Appointment is{appointment.isRunning ? ' ' : ' not '}running.
      </Typography>

      {renderIf(appointment.isRunning)(() => (
        <JoinConferenceButton appointment={appointment} />
      ))}

      {renderIf(isPresenter && !appointment.isRunning)(() => (
        <StartConferenceButton appointment={appointment} />
      ))}
    </StandardPage>
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
