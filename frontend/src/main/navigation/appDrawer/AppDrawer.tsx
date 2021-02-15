import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { DRAWER_WIDTH, STICKY_DRAWER_MIN_WIDTH } from '../../../config/style';
import { theme } from '../../../theme';
import { linking, stacks } from '../config';

const Drawer = createDrawerNavigator();

export function AppDrawer(): JSX.Element {
  const dimensions = useWindowDimensions();

  return (
    <NavigationContainer linking={linking} theme={theme}>
      <Drawer.Navigator
        initialRouteName="appointments"
        drawerType={
          dimensions.width >= STICKY_DRAWER_MIN_WIDTH ? 'permanent' : 'front'
        }
        drawerStyle={styles.drawer}
      >
        {Object.values(stacks).map((stack) => (
          <Drawer.Screen
            name={stack.name}
            component={stack.component}
            options={{ drawerLabel: stack.drawerLabel }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: { width: DRAWER_WIDTH },
});
