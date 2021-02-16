import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StandardHeading } from '../../../components/StandardHeading';
import { StandardScreen } from '../../../components/StandardScreen';
import { useSelector } from '../../../redux/root/hooks';
import {
  AppointmentResource,
  requests,
} from '../../../utilities/requests/requests';
import { AppointmentListItem } from './AppointmentListItem';

export function IndexAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState([] as AppointmentResource[]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    requests.indexAppointmentsForUser(userId).then((response) => {
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
      {appointments.map((appointment) => (
        <AppointmentListItem appointment={appointment} key={appointment.id} />
      ))}
    </StandardScreen>
  );
}
