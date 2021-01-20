import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Chat } from './chat/Chat';
import { Jitsi } from './jitsi/Jitsi';
import { Presentation } from './presentation/Presentation';

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
