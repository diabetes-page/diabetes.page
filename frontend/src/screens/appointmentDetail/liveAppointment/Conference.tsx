import React, { useCallback, useState } from 'react';
import { Jitsi } from './jitsi/Jitsi';
import { Converse } from './converse/Converse';
import { renderIf } from '../../../utilities/rendering/rendering';
import { useProcessMessages } from './utilities/hooks/useProcessMessages';
import { Presentation } from './presentation/Presentation';

export function Conference(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);
  useProcessMessages();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Presentation />
      <Jitsi onLoad={onJitsiLoad} />
      {renderIf(jitsiLoaded)(() => (
        <Converse />
      ))}
    </div>
  );
}
