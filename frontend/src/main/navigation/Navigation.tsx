import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { STICKY_DRAWER_MIN_WIDTH } from '../../config/constants/constants';
import { AppointmentDetail } from '../screens/appointmentDetail/AppointmentDetail';
import { IndexAppointments } from '../screens/indexAppointments/IndexAppointments';

const Drawer = createDrawerNavigator();

export function Navigation(): JSX.Element {
  const dimensions = useWindowDimensions();

  return (
    <NavigationContainer linking={{ prefixes: [], enabled: true }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerType={
          dimensions.width >= STICKY_DRAWER_MIN_WIDTH ? 'permanent' : 'front'
        }
      >
        <Drawer.Screen
          name="appointments"
          component={IndexAppointments}
          options={{ drawerLabel: 'Show appointments' }}
        />
        {/* todo: i18n */}
        <Drawer.Screen
          name="appointment"
          component={AppointmentDetail}
          options={{ drawerLabel: 'Appointment' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
