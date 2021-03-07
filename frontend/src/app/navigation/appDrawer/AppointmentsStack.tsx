import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IndexAppointmentsScreen } from '../../screens/indexAppointments/IndexAppointments';
import { ShowConferenceScreen } from '../../screens/showConference/ShowConference';

export const AppointmentsStack = {
  name: 'appointmentsStack',
  drawerLabel: 'Appointments' /* todo: i18n */,
  component: Appointments,
  screens: {
    index: IndexAppointmentsScreen,
    conference: ShowConferenceScreen,
  },
};

const Stack = createStackNavigator();

function Appointments(): JSX.Element {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={AppointmentsStack.screens.index.name}
    >
      {Object.values(AppointmentsStack.screens).map((screen) => (
        <Stack.Screen
          name={screen.name}
          key={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
}
