import React, { useEffect } from 'react';
import { View } from 'react-native';
import { WEBSOCKET_URL } from '../../../../config/networking';

export function ConferenceWrapper(): JSX.Element {
  // const [jitsiLoaded, setJitsiLoaded] = useState(false);
  // const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  useEffect(() => {
    console.log('socket start');
    const socket = new WebSocket(WEBSOCKET_URL);
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', JSON.parse(event.data));
    });
    socket.addEventListener('open', (event) => {
      socket.send(
        JSON.stringify({
          event: 'events',
          data: {
            a: 'b',
          },
        }),
      );
    });
    // socket.send('msgToServer');
  }, []);

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
