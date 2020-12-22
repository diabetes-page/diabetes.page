import React, { useContext, useEffect } from 'react';
import {
  ConferenceContext,
  ConferenceControls,
} from '../utilities/conferenceContext/ConferenceContext';
import { registerConverseAPI } from '../utilities/conferenceContext/actions';

const WRAPPER_ID = 'conversejs';

export function Converse(): JSX.Element {
  useConverse();

  return <div id={WRAPPER_ID} style={{ height: '400px' }} />;
}

const useConverse = (): void => {
  const conference = useContext(ConferenceContext);

  useEffect(() => {
    document.head.insertAdjacentHTML(
      'beforeend',
      `
            <style>
              #${WRAPPER_ID} #controlbox,
              #${WRAPPER_ID} .occupants,
              #${WRAPPER_ID} .chat-head,
              #${WRAPPER_ID} .chat-toolbar--container {
                display: none !important; 
                visibility: hidden !important;
              }
              </style>
          `,
    );

    const script = document.createElement('script');
    script.src = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.js';
    script.async = true;
    script.onload = () => void initConverse(conference);
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.css';
    document.head.appendChild(link);

    return (): void => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);
};

const initConverse = (conference: ConferenceControls): void => {
  // @ts-ignore : converse is loaded into window by script
  window.converse.plugins.add('diabetes-page', {
    initialize: function () {
      console.warn('vr register', this._converse.api);
      conference!.dispatch(registerConverseAPI(this._converse.api));
    },
  });

  // @ts-ignore : converse is loaded into window by script
  window.converse.initialize({
    whitelisted_plugins: ['diabetes-page'],
    view_mode: 'embedded',
    bosh_service_url: `https://localhost:8443/http-bind?token=${
      conference!.state.conferenceToken
    }`,
    authentication: 'anonymous',
    jid: 'meet.jitsi',
    auto_login: 'true',
    auto_join_rooms: [
      {
        jid: conference!.state.conferenceRoom + '@muc.meet.jitsi',
        nick: Math.round(Math.random() * 10000).toString(),
      },
    ],
  });
};
