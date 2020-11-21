import { Button, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Get, withAuth } from '../../../utilities/axios/axios';
import { renderIf } from '../../../utilities/rendering/rendering';
import { Conference } from './Conference';

type ConferenceData = {
  conferenceToken: string;
  room: string;
};
export const ConferenceContext = React.createContext<
  ConferenceData | undefined
>(undefined);

export function LiveAppointment(): JSX.Element {
  const [conferenceData, startConference] = useConference();

  return (
    <>
      <Text>Live Termin</Text>

      {renderIf(!conferenceData)(
        <Button title="Teilnehmen" onPress={startConference} />,
        <ConferenceContext.Provider value={conferenceData}>
          <Conference />
        </ConferenceContext.Provider>,
      )}
    </>
  );
}

const useConference = (): [ConferenceData | undefined, () => void] => {
  const [conferenceData, setConferenceData] = useState();
  const startConference = useCallback(() => {
    Get('/appointments/1/conference', withAuth()).then((response) => {
      setConferenceData(response.data);
    });
  }, [conferenceData, setConferenceData]);

  return [conferenceData, startConference];
};
