import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { WEBSOCKET_URL } from '../../../../config/networking';
import { LOCAL_STORAGE_JWT_KEY } from '../../../../config/security';

export function ConferenceWrapper(): JSX.Element {
  // const [jitsiLoaded, setJitsiLoaded] = useState(false);
  // const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  useEffect(() => void socketTest(), []);

  return (
    <View>
      {/*<Presentation />*/}
      {/*<View style={{ display: 'flex', flexDirection: 'row' }}>*/}
      {/*  <Jitsi onLoad={onJitsiLoad} />*/}
      {/*  {renderIf(jitsiLoaded)(() => (*/}
      {/*    <Chat />*/}
      {/*  ))}*/}
      {/*</View>*/}
    </View>
  );
}

async function socketTest(): Promise<void> {
  const token = await AsyncStorage.getItem(LOCAL_STORAGE_JWT_KEY);
  const socket = new WebSocket(WEBSOCKET_URL);

  socket.addEventListener('message', function (event) {
    console.log('Message from server ', JSON.parse(event.data));
  });

  socket.addEventListener('error', function (event) {
    console.log('WebSocket error: ', event);
  });

  socket.addEventListener('close', function (event) {
    console.log('WebSocket close: ', event);
  });

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        event: 'events',
        data: {
          authorization: 'Bearer ' + token,
          test: 42,
        },
      }),
    );
  });
}
