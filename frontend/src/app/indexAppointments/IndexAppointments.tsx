import React, { useEffect } from 'react';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardLoadingPage } from '../../components/StandardLoadingPage';
import { StandardPage } from '../../components/StandardPage';
import { useSelector } from '../../redux/root/hooks';
import { useLoadingState } from '../../utilities/hooks/hooks';
import {
  AppointmentWithWorkingGroupsResource,
  requests,
} from '../../utilities/requests/requests';
import { AppointmentListItem } from './AppointmentListItem';

export function IndexAppointments(): JSX.Element {
  const [appointments, setAppointments, isLoading] = useLoadingState<
    AppointmentWithWorkingGroupsResource[]
  >();
  const user = useSelector((state) => state.user!);

  useEffect(() => {
    if (user.consultantId) {
      requests
        .indexConsultantAppointments(user.consultantId)
        .then((response) => {
          setAppointments(response.data.appointments);
        });
    } else {
      requests.indexParticipantAppointments(user.id).then((response) => {
        setAppointments(response.data.appointments);
      });
    }
  }, [setAppointments, user]);

  if (isLoading || !appointments) {
    return <StandardLoadingPage />;
  }

  return (
    <StandardPage>
      <StandardHeading>My appointments</StandardHeading>
      {appointments.map((appointmentWithGroups) => (
        <AppointmentListItem
          appointmentWithGroups={appointmentWithGroups}
          key={appointmentWithGroups.appointment.id}
        />
      ))}
    </StandardPage>
  );
}
