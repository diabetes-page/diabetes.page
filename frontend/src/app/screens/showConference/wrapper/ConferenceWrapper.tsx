import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { StandardScreen } from '../../../../components/StandardScreen';
import { renderIf } from '../../../../utilities/misc/rendering';
import { Chat } from '../chat/Chat';
import { Jitsi } from '../jitsi/Jitsi';
import { Presentation } from '../presentation/Presentation';

export function ConferenceWrapper(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  return (
    <StandardScreen>
      <Presentation />
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Jitsi onLoad={onJitsiLoad} />
        {renderIf(jitsiLoaded)(() => (
          <Chat />
        ))}
      </View>
    </StandardScreen>
  );
}
