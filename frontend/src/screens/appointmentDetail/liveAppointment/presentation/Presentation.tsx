import React, { useCallback, useContext } from 'react';
import { ConferenceContext } from '../utilities/conferenceContext/ConferenceContext';
import { Button, Text } from 'react-native';
import { Get, Put, withAuth } from '../../../../utilities/axios/axios';
import { initConference } from '../utilities/conferenceContext/actions';
import { useSendMessage } from '../utilities/hooks/useSendMessage';

export const Presentation = (): JSX.Element => {
  const conference = useContext(ConferenceContext);
  const changeSlide = useChangeSlide();

  return (
    <div>
      <Text>Presentation slide: {conference!.state.presentationIndex}</Text>
      <Button title="Change slide" onPress={changeSlide} />
    </div>
  );
};

function useChangeSlide(): () => void {
  const sendMessage = useSendMessage();

  return useCallback(() => {
    const presentationIndex = Math.round(10000 * Math.random() + 2);
    Put(
      '/appointments/1/conference/slide',
      {
        presentationIndex,
      },
      withAuth(),
    ).then((response) => {
      console.warn('vr GOT ANSWER');
      sendMessage(response.data.officialMessage);
    });
  }, [sendMessage]);
}
