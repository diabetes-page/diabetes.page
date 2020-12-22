import React, { RefObject, useContext, useEffect, useRef } from 'react';
import { ConferenceContext } from '../ConferenceContext/ConferenceContext';
import JitsiApi from './JitsiApi';

type Props = {
  onLoad: () => void;
};

export const Jitsi = ({ onLoad }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  useJitsi(onLoad, ref);

  return <div style={{ flex: '50%' }} ref={ref} />;
};

const useJitsi = (onLoad: () => void, ref: RefObject<HTMLDivElement>): void => {
  const conferenceData = useContext(ConferenceContext);

  useEffect(() => {
    const domain = 'localhost:8443';
    const options = {
      roomName: conferenceData!.state.room!,
      jwt: conferenceData!.state.conferenceToken!,
      parentNode: ref.current,
      width: 700, // todo: figure out width/height
      height: 700,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'stats'],
        TOOLBAR_ALWAYS_VISIBLE: true,
        DISABLE_VIDEO_BACKGROUND: true,
      },
    };

    // Todo: It's a good practice to remove the conference before the page is unloaded.
    const jitsi = new JitsiApi(domain, options);

    jitsi.on('videoConferenceJoined', (data: Record<string, string>) => {
      console.warn('Data got', data);
      onLoad();
    });

    jitsi.on('incomingMessage', (data: Record<string, string>) => {
      console.warn('incomingMessage got', data);
    });
  }, []);
};
