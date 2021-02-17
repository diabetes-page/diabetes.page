import React, { useState } from 'react';
import { View } from 'react-native';
import { StandardScreen } from '../../../../components/StandardScreen';
import { renderIf } from '../../../../utilities/misc/rendering';
import { Chat } from '../chat/Chat';
import { Jitsi } from '../jitsi/Jitsi';

export function ConferenceWrapper(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);

  return (
    <StandardScreen>
      {/*<Presentation />*/}
      <View>
        <Jitsi onLoad={() => void setJitsiLoaded(true)} />
        {renderIf(jitsiLoaded)(() => (
          <Chat />
        ))}
      </View>
    </StandardScreen>
  );
}
