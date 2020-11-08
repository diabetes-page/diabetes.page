import React, { useEffect } from 'react';
import { Button, Text, useWindowDimensions, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const ROOM_NAME = 'af44';

function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="meet" style={{ flex: '50%' }} />
      <div style={{ flex: '50%' }} id="conversejs" />
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

const useJitsi = (): Promise<string> =>
  new Promise((resolve) =>
    useEffect(() => {
      const script = document.createElement('script');

      script.src = 'https://localhost:8443/external_api.js';
      script.async = true;
      script.onload = (): void => {
        const domain = 'localhost:8443';
        const options = {
          roomName: ROOM_NAME,
          width: 700,
          height: 700,
          parentNode: document.querySelector('#meet'),
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'stats'],
            TOOLBAR_ALWAYS_VISIBLE: true,
            DISABLE_VIDEO_BACKGROUND: true,
          },
        };

        // NOTE: It's a good practice to remove the conference before the page is unloaded.
        // @ts-ignore
        const jitsi = new window.JitsiMeetExternalAPI(domain, options);

        jitsi.on('videoConferenceJoined', (data: Record<string, string>) => {
          console.warn(data);
          resolve(data.id);
        });
      };

      document.body.appendChild(script);

      return () => void document.body.removeChild(script);
    }, []),
  );

const useConverse = (): Promise<void> =>
  new Promise((resolve) =>
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.js';
      script.async = true;
      script.onload = () => void resolve();
      document.body.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.css';
      document.head.appendChild(link);

      return () => void document.body.removeChild(script);
    }, []),
  );

function App(): JSX.Element {
  const dimensions = useWindowDimensions();
  const jitsiPromise = useJitsi();
  const conversePromise = useConverse();

  jitsiPromise.then((userId) =>
    conversePromise.then(() => {
      // @ts-ignore
      window.converse.initialize({
        view_mode: 'embedded',
        bosh_service_url: 'https://localhost:8443/http-bind',
        authentication: 'login',
        auto_login: 'true',
        jid: 'user@meet.jitsi',
        password: 'pass',
        auto_join_rooms: [
          //ROOM_NAME + '@muc.meet.jitsi',
          { jid: ROOM_NAME + '@muc.meet.jitsi', nick: userId },
        ],
      });
    }),
  );

  return (
    <NavigationContainer linking={{ prefixes: [], enabled: true }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerType={
          'front' // dimensions.width >= 768 ? 'permanent' : 'front'
        }
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
