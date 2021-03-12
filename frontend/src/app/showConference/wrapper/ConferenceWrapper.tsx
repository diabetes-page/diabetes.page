import { Box } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { StandardHeading } from '../../../components/StandardHeading';
import { StandardPage } from '../../../components/StandardPage';
import { useSelector } from '../../../redux/root/hooks';
import { renderIf } from '../../../utilities/misc/rendering';
import { Chat } from '../chat/Chat';
import { Jitsi } from '../jitsi/Jitsi';
import { Presentation } from '../presentation/Presentation';

export function ConferenceWrapper(): JSX.Element {
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const onJitsiLoad = useCallback(() => void setJitsiLoaded(true), [
    setJitsiLoaded,
  ]);
  const training = useSelector((state) => state.live.appointment!.training);

  return (
    <StandardPage>
      <StandardHeading>{training?.name ?? 'Appointment'}</StandardHeading>
      <Box display="flex" justifyContent="space-evenly">
        <Presentation />
        <Jitsi onLoad={onJitsiLoad} />
        {renderIf(jitsiLoaded)(() => (
          <Chat />
        ))}
      </Box>
    </StandardPage>
  );
}
