import React, { RefObject, useContext, useEffect, useRef } from 'react';
import { ConferenceContext } from '../utilities/conferenceContext/ConferenceContext';
import JitsiApi from './JitsiApi';
import { View } from 'react-native';

type Props = {
  onLoad: () => void;
};

export const Jitsi = ({ onLoad }: Props): JSX.Element => {
  const ref = useRef<View>(null);
  useJitsi(onLoad, ref);

  return <View ref={ref} />;
};

const useJitsi = (onLoad: () => void, ref: RefObject<View>): void => {
  const conference = useContext(ConferenceContext);
  const [conferenceRoom, conferenceToken] = [
    conference?.state.conferenceRoom,
    conference?.state.conferenceToken,
  ];

  useEffect(() => {
    const domain = 'localhost:8443';
    const options = {
      roomName: conferenceRoom,
      jwt: conferenceToken,
      parentNode: ref.current,
      width: 700, // todo: figure out width/height
      height: 700,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'stats'],
        TOOLBAR_ALWAYS_VISIBLE: true,
        DISABLE_VIDEO_BACKGROUND: true,
      },
    };

    // Todo: It's a good practice to remove the conference before the page is unloaded.
    const jitsi = new JitsiApi(domain, options);

    jitsi.on('videoConferenceJoined', onLoad);
  }, [conferenceRoom, conferenceToken, onLoad, ref]);
};
