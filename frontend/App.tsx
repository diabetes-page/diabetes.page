import React, { useEffect } from 'react';
import { Button, Text, useWindowDimensions, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <div id="meet" />
      <Button
        title="Go to Details"
        onPress={() => void navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go back home!" onPress={() => void navigation.goBack()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  const dimensions = useWindowDimensions();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://localhost:8443/external_api.js';
    script.async = true;
    script.onload = (): void => {
      const domain = 'localhost:8443';
      const options = {
        roomName: 'xxxx',
        width: 700,
        height: 700,
        parentNode: document.querySelector('#meet'),
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat'],
          TOOLBAR_ALWAYS_VISIBLE: true,
          DISABLE_VIDEO_BACKGROUND: true,
        },
      };
      // @ts-ignore
      const api = new window.JitsiMeetExternalAPI(domain, options);
      console.log(api);
    };

    document.body.appendChild(script);
    return () => void document.body.removeChild(script);
  }, []);

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
          name="Home"
          component={HomeScreen}
          options={{ drawerLabel: 'xxx' }}
        />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
