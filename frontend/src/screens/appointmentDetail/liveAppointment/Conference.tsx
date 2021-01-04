import React, { useCallback, useState } from 'react';
import { Jitsi } from './jitsi/Jitsi';
import { Chat } from './chat/Chat';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Presentation } from './presentation/Presentation';
import { View } from 'react-native';

export function Conference(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  return (
    <View>
      <Presentation />
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Jitsi onLoad={onJitsiLoad} />
        {renderIf(jitsiLoaded)(() => (
          <Chat />
        ))}
      </View>
    </View>
  );
}
