import React, { useContext, useEffect } from 'react';
import { ConferenceContext } from './LiveAppointment';

const WRAPPER_ID = 'jitsi';

export function Jitsi(): JSX.Element {
  useJitsi();

  return <div id={WRAPPER_ID} style={{ flex: '50%' }} />;
}

const useJitsi = (): Promise<string> =>
  new Promise((resolve) => {
    const conferenceData = useContext(ConferenceContext);

    return useEffect(() => {
      const script = document.createElement('script');

      script.src = 'https://localhost:8443/external_api.js';
      script.async = true;
      script.onload = (): void => {
        const domain = 'localhost:8443';
        const options = {
          roomName: conferenceData?.room,
          jwt: conferenceData?.conferenceToken,
          parentNode: document.getElementById(WRAPPER_ID),
          width: 700, // todo: figure out width/height
          height: 700,
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'stats'],
            TOOLBAR_ALWAYS_VISIBLE: true,
            DISABLE_VIDEO_BACKGROUND: true,
          },
        };

        // NOTE: It's a good practice to remove the conference before the page is unloaded.
        // @ts-ignore
        const jitsi = new window.JitsiMeetExternalAPI(domain, options);

        jitsi.on('videoConferenceJoined', (data: Record<string, string>) => {
          console.warn(data);
          resolve(data.id);
        });
      };

      document.body.appendChild(script);

      return () => void document.body.removeChild(script);
    }, []);
  });
