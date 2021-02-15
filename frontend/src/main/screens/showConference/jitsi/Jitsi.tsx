import React, { RefObject, useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { JITSI_DOMAIN } from '../../../../config/jitsi';
import { ConferenceContext } from '../utilities/conferenceContext/ConferenceContext';
import JitsiApi from './JitsiApi';

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

    const jitsi = new JitsiApi(JITSI_DOMAIN, options);

    jitsi.on('videoConferenceJoined', onLoad);

    // todo: more sophisticated unload check? (also on tab change)
    window.addEventListener('beforeunload', () => void jitsi.dispose());
  }, [conferenceRoom, conferenceToken, onLoad, ref]);
};
