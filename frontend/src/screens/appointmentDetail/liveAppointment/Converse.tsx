import React, { useContext, useEffect } from 'react';
import { ConferenceContext } from './LiveAppointment';

const WRAPPER_ID = 'conversejs';

type Props = {
  jitsiUserId: string;
};

export function Converse({ jitsiUserId }: Props): JSX.Element {
  useConverse(jitsiUserId);

  return <div id={WRAPPER_ID} style={{ flex: '50%' }} />;
}

const useConverse = (jitsiUserId: string): void => {
  const conferenceData = useContext(ConferenceContext)!;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.js';
    script.async = true;
    script.onload = () =>
      void initConverse(
        conferenceData.conferenceToken,
        jitsiUserId,
        conferenceData.room,
      );
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.css';
    document.head.appendChild(link);

    return () => void document.body.removeChild(script);
  }, []);
};

const initConverse = (
  conferenceToken: string,
  jitsiUserId: string,
  roomName: string,
): void => {
  // @ts-ignore
  window.converse.initialize({
    view_mode: 'embedded',
    bosh_service_url:
      'https://localhost:8443/http-bind?test=test&token=' + conferenceToken,
    authentication: 'anonymous',
    auto_login: 'true',
    jid: roomName + '@muc.meet.jitsi',
    auto_join_rooms: [{ jid: roomName + '@muc.meet.jitsi', nick: jitsiUserId }],
  });
};
