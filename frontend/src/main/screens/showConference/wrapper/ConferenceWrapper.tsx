import React, { useEffect } from 'react';
import { View } from 'react-native';

export function ConferenceWrapper(): JSX.Element {
  // const [jitsiLoaded, setJitsiLoaded] = useState(false);
  // const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  useEffect(() => {
    console.log('socket start');
    const socket = new WebSocket('ws://localhost:7348');
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
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
