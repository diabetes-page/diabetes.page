import React from 'react';
import { View } from 'react-native';
import { LiveAppointment } from './liveAppointment/LiveAppointment';

export function AppointmentDetail(): JSX.Element {
  return (
    <View>
      <LiveAppointment />
    </View>
  );
}
