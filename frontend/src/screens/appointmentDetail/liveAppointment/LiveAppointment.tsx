import { Button, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Converse } from './Converse';
import { Jitsi } from './Jitsi';
import { Get, withAuth } from '../../../utilities/axios/axios';

export const LiveContext = React.createContext<string>('');

export function LiveAppointment(): JSX.Element {
  return (
    <>
      <Text>Live Termin</Text>

      <Conference />
    </>
  );
}

function Conference(): JSX.Element {
  const [conferenceToken, startConference] = useConference();

  if (conferenceToken === undefined) {
    return <Button title="Teilnehmen" onPress={startConference} />;
  }

  return (
    <LiveContext.Provider value={conferenceToken}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Jitsi />
        <Converse />
      </div>
    </LiveContext.Provider>
  );
}

const useConference = (): [string | undefined, () => void] => {
  const [conferenceToken, setConferenceToken] = useState();
  const startConference = useCallback(() => {
    Get('/appointments/1/conference-token', withAuth()).then((response) => {
      setConferenceToken(response.data.conferenceToken);
      console.log(response.data.conferenceToken);
    });
  }, [conferenceToken, setConferenceToken]);

  return [conferenceToken, startConference];
};
