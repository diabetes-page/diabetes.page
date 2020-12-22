import React, { useCallback, useState } from 'react';
import { Jitsi } from './jitsi/Jitsi';
import { Converse } from './converse/Converse';
import { renderIf } from '../../../utilities/rendering/rendering';
import { useProcessMessages } from './utilities/hooks/useProcessMessages';

export function Conference(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);
  useProcessMessages();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Jitsi onLoad={onJitsiLoad} />
      {renderIf(jitsiLoaded)(() => (
        <Converse />
      ))}
    </div>
  );
}
