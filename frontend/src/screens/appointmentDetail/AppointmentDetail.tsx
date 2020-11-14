import { View } from 'react-native';
import React from 'react';
import { LiveAppointment } from './liveAppointment/LiveAppointment';

export function AppointmentDetail(): JSX.Element {
  return (
    <View>
      <LiveAppointment />
    </View>
  );
}
