import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

type Props = {
  navigation: StackNavigationProp<Record<any, any>>;
};

function HomeScreen({ navigation }: Props): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => void navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }: Props): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go back home!" onPress={() => void navigation.goBack()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer linking={{ enabled: true }}>
      <Drawer.Navigator initialRouteName="Home" drawerType="permanent">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
