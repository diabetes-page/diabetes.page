import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { stacks } from '../config';

const Stack = createStackNavigator();

export function AppointmentsStack(): JSX.Element {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={stacks.appointments.screens.index.name}
    >
      {Object.values(stacks.appointments.screens).map((screen) => (
        <Stack.Screen
          name={screen.name}
          key={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
}
