import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { stacks } from '../config';

const Stack = createStackNavigator();

export function AppointmentsStack(): JSX.Element {
  return (
    <Stack.Navigator headerMode="none">
      {Object.values(stacks.appointments.screens).map((screen) => (
        <Stack.Screen name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
}
