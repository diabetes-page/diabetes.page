import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Jitsi } from './Jitsi';
import { Converse } from './Converse';
import { ConferenceContext } from './ConferenceContext/ConferenceContext';

export function Conference(): JSX.Element {
  const jitsiRef = useRef<HTMLDivElement>(null);
  const hasJitsiLoaded = useJitsi(jitsiRef);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Jitsi ref={jitsiRef} />
      {hasJitsiLoaded && <Converse />}
    </div>
  );
}

const useJitsi = (jitsiRef: RefObject<HTMLDivElement>): boolean => {
  const conferenceData = useContext(ConferenceContext);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://localhost:8443/external_api.js';
    script.async = true;
    script.onload = (): void => {
      const domain = 'localhost:8443';
      const options = {
        roomName: conferenceData!.state.room!,
        jwt: conferenceData!.state.conferenceToken!,
        parentNode: jitsiRef.current,
        width: 700, // todo: figure out width/height
        height: 700,
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'stats'],
          TOOLBAR_ALWAYS_VISIBLE: true,
          DISABLE_VIDEO_BACKGROUND: true,
        },
      };

      // NOTE: It's a good practice to remove the conference before the page is unloaded.
      // @ts-ignore : JitsiMeetExternalAPI is loaded into window by script
      const jitsi = new window.JitsiMeetExternalAPI(domain, options);

      jitsi.on('videoConferenceJoined', (data: Record<string, string>) => {
        console.warn('Data got', data);
        setUserId(data.id);
      });

      jitsi.on('incomingMessage', (data: Record<string, string>) => {
        console.warn('incomingMessage got', data);
      });
    };

    document.body.appendChild(script);

    return () => void document.body.removeChild(script);
  }, []);

  return userId !== undefined;
};
