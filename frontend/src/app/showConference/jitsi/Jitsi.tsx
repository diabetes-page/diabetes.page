import { useTheme } from '@material-ui/core';
import React, { RefObject, useEffect, useRef } from 'react';
import { JITSI_DOMAIN } from '../../../config/jitsi';
import { JITSI_HEIGHT, JITSI_WIDTH } from '../../../config/style';
import { useConferenceRoomAndToken } from '../hooks/useConferenceRoomAndToken';
import JitsiApi from './JitsiApi';

type Props = {
  onLoad: () => void;
};

// This export must be default in order to work with next.js dynamic import
export default function Jitsi({ onLoad }: Props): JSX.Element {
  const parentNode = useRef<HTMLDivElement>(null);
  useJitsi(onLoad, parentNode);

  return <div ref={parentNode} />;
}

const useJitsi = (
  onLoad: () => void,
  parentNode: RefObject<HTMLDivElement>,
): void => {
  const { conferenceRoom, conferenceToken } = useConferenceRoomAndToken();
  const jitsi = useRef<JitsiApi>();
  const theme = useTheme();

  function endJitsi(): void {
    jitsi.current?.executeCommand('hangup');
    jitsi.current?.dispose();
  }

  useEffect(() => {
    endJitsi();

    const options = {
      roomName: conferenceRoom,
      jwt: conferenceToken,
      parentNode: parentNode.current,
      width: JITSI_WIDTH,
      height: JITSI_HEIGHT,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'stats'],
        TOOLBAR_ALWAYS_VISIBLE: true,
        DISABLE_VIDEO_BACKGROUND: true,
        DEFAULT_BACKGROUND: theme.palette.background.default,
        DEFAULT_REMOTE_DISPLAY_NAME: '(chat client)',
      },
    };
    jitsi.current = new JitsiApi(JITSI_DOMAIN, options);
    jitsi.current.on('videoConferenceJoined', onLoad);

    window.addEventListener('beforeunload', () => void endJitsi());

    return () => void endJitsi();
  }, [onLoad, parentNode, conferenceRoom, conferenceToken, jitsi, theme]);
};
