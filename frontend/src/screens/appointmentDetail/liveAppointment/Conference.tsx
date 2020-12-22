import React, { useCallback, useState } from 'react';
import { Jitsi } from './Jitsi/Jitsi';
import { Converse } from './Converse/Converse';
import { renderIf } from '../../../utilities/rendering/rendering';

export function Conference(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => setJitsiLoaded(true), [setJitsiLoaded]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Jitsi onLoad={onJitsiLoad} />
      {renderIf(jitsiLoaded)(() => (
        <Converse />
      ))}
    </div>
  );
}
