import React, { useCallback, useState } from 'react';
import { StandardScreen } from '../../../../components/StandardScreen';
import { renderIf } from '../../../../utilities/misc/rendering';
import { Chat } from '../chat/Chat';
import { Jitsi } from '../jitsi/Jitsi';
import { Presentation } from '../presentation/Presentation';

export function ConferenceWrapper(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => void setJitsiLoaded(true), [
    setJitsiLoaded,
  ]);

  return (
    <StandardScreen>
      <Presentation />
      <Jitsi onLoad={onJitsiLoad} />
      {renderIf(jitsiLoaded)(() => (
        <Chat />
      ))}
    </StandardScreen>
  );
}
