import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { StandardHeading } from '../../../../components/StandardHeading';
import { StandardScreen } from '../../../../components/StandardScreen';
import { useSelector } from '../../../../redux/root/hooks';
import { renderIf } from '../../../../utilities/misc/rendering';
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
    <StandardScreen>
      <StandardHeading>{training?.name ?? 'Appointment'}</StandardHeading>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Presentation />
        <Jitsi onLoad={onJitsiLoad} />
        {renderIf(jitsiLoaded)(() => (
          <Chat />
        ))}
      </View>
    </StandardScreen>
  );
}
