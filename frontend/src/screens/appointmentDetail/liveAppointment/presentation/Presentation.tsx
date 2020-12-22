import React, { useContext } from 'react';
import { ConferenceContext } from '../utilities/conferenceContext/ConferenceContext';
import { Text } from 'react-native';

export const Presentation = (): JSX.Element => {
  const conference = useContext(ConferenceContext);

  return (
    <div>
      <Text>Presentation slide: {conference!.state.presentationIndex}</Text>
    </div>
  );
};
