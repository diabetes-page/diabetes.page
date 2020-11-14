import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from '../screens/login/Login';
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
        <Drawer.Screen
          name="login"
          component={Login}
          options={{ drawerLabel: 'Login' }}
        />
        <Drawer.Screen
          name="training"
          component={AppointmentDetail}
          options={{ drawerLabel: 'Training' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
