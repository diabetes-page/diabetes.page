import React, { useCallback, useState } from 'react';
import { Jitsi } from './jitsi/Jitsi';
import { Chat } from './chat/Chat';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Presentation } from './presentation/Presentation';

export function Conference(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Presentation />
      <Jitsi onLoad={onJitsiLoad} />
      {renderIf(jitsiLoaded)(() => (
        <Chat />
      ))}
    </div>
  );
}
