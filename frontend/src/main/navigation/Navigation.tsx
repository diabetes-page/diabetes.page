import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { AppointmentDetail } from '../screens/appointmentDetail/AppointmentDetail';

const Drawer = createDrawerNavigator();

export function Navigation(): JSX.Element {
  const dimensions = useWindowDimensions();

  return (
    <NavigationContainer linking={{ prefixes: [], enabled: true }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
        drawerContentOptions={{
          activeBackgroundColor: 'pink',
          activeTintColor: 'blue',
        }}
      >
        {/* todo: i18n */}
        <Drawer.Screen
          name="appointment"
          component={AppointmentDetail}
          options={{ drawerLabel: 'Termin' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
