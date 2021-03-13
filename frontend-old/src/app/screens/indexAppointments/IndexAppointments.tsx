import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StandardHeading } from '../../../components/StandardHeading';
import { StandardScreen } from '../../../components/StandardScreen';
import { useSelector } from '../../../redux/root/hooks';
import {
  AppointmentWithWorkingGroupsResource,
  requests,
} from '../../../utilities/requests/requests';
import { AppointmentListItem } from './AppointmentListItem';

export const IndexAppointmentsScreen = {
  name: 'indexAppointments',
  url: '/appointments',
  component: IndexAppointments,
};

function IndexAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState<
    AppointmentWithWorkingGroupsResource[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    requests.indexParticipantAppointments(userId).then((response) => {
      setAppointments(response.data.appointments);
      setIsLoading(false);
    });
  }, [userId]);

  if (isLoading) {
    return (
      <StandardScreen>
        <ActivityIndicator animating />
      </StandardScreen>
    );
  }

  return (
    <StandardScreen>
      <StandardHeading>My appointments</StandardHeading>
      {appointments.map((appointmentWithGroups) => (
        <AppointmentListItem
          appointmentWithGroups={appointmentWithGroups}
          key={appointmentWithGroups.appointment.id}
        />
      ))}
    </StandardScreen>
  );
}
