import React, { useEffect } from 'react';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardLoadingPage } from '../../components/StandardLoadingPage';
import { StandardPage } from '../../components/StandardPage';
import { useSelector } from '../../redux/root/hooks';
import { useLoadingState } from '../../utilities/hooks/hooks';
import {
  AppointmentInWorkingGroupResource,
  requests,
} from '../../utilities/requests/requests';
import { AppointmentListItem } from './AppointmentListItem';

export function IndexAppointments(): JSX.Element {
  const [appointments, setAppointments, isLoading] = useLoadingState<
    AppointmentInWorkingGroupResource[]
  >();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    requests.indexAppointmentsForUser(userId).then((response) => {
      setAppointments(response.data.appointments);
    });
  }, [setAppointments, userId]);

  if (isLoading || !appointments) {
    return <StandardLoadingPage />;
  }

  return (
    <StandardPage>
      <StandardHeading>My appointments</StandardHeading>
      {appointments.map((appointmentInGroup) => (
        <AppointmentListItem
          appointmentInGroup={appointmentInGroup}
          key={appointmentInGroup.appointment.id}
        />
      ))}
    </StandardPage>
  );
}
