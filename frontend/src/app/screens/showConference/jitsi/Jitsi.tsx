import React, { RefObject, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { JITSI_DOMAIN } from '../../../../config/jitsi';
import { useConferenceRoomAndToken } from '../hooks/useConferenceRoomAndToken';
import JitsiApi from './JitsiApi';

type Props = {
  onLoad: () => void;
};

export const Jitsi = ({ onLoad }: Props): JSX.Element => {
  const parentNode = useRef<View>(null);
  useJitsi(onLoad, parentNode);

  return <View ref={parentNode} />;
};

const useJitsi = (onLoad: () => void, parentNode: RefObject<View>): void => {
  const { conferenceRoom, conferenceToken } = useConferenceRoomAndToken();

  useEffect(() => {
    const options = {
      roomName: conferenceRoom,
      jwt: conferenceToken,
      parentNode: parentNode.current,
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

    // todo: more sophisticated unload check? (also when user navigates away?)
    window.addEventListener('beforeunload', () => void jitsi.dispose());
    return () => void jitsi.dispose();
  }, [onLoad, parentNode, conferenceRoom, conferenceToken]);
};
