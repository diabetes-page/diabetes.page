import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  AppointmentResource,
  requests,
} from '../../../utilities/requests/requests';
import { AppointmentListItem } from './AppointmentListItem';

export function IndexAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState([] as AppointmentResource[]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user.id);

  function getAppointments(): void {
    requests.indexAppointmentsForUser(1).then((response) => {
      setAppointments(response.data.appointments);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getAppointments();
  }, []);

  if (isLoading) {
    return (
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <ActivityIndicator animating />
      </View>
    );
  }

  return (
    <View>
      {appointments.map((appointment) => (
        <AppointmentListItem
          name={appointment?.training?.name || 'No training'}
          presenter={appointment.presenter.user.name}
          key={appointment.id}
        />
      ))}
    </View>
  );
}
