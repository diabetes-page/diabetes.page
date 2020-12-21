import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button } from 'react-native';
import { Put, withAuth } from '../../../utilities/axios/axios';
import { ConferenceContext } from './ConferenceContext/ConferenceContext';

const WRAPPER_ID = 'conversejs';

export function Converse(): JSX.Element {
  useConverse();
  const [slideIndex, setSlideIndex, changeSlide] = useSlides();

  return (
    <>
      Slide index: {slideIndex} <br />
      <Button title="Change slide" onPress={changeSlide} />
      <br />
      <div id={WRAPPER_ID} style={{ flex: '50%' }} />
    </>
  );
}

const useSlides = (): [
  number,
  Dispatch<SetStateAction<number>>,
  () => void,
] => {
  const [slideIndex, setSlideIndex] = useState(0);

  const changeSlide = useCallback(() => {
    const newSlideIndex = 1 + Math.round(Math.random() * 10000);

    Put(
      '/appointments/1/conference/slide',
      {
        slideIndex: newSlideIndex,
      },
      withAuth(),
    ).then(() => setSlideIndex(newSlideIndex));
  }, [setSlideIndex]);

  return [slideIndex, setSlideIndex, changeSlide];
};

const useConverse = (): void => {
  const conferenceData = useContext(ConferenceContext)!;

  useEffect(() => {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>#${WRAPPER_ID} #controlbox, #${WRAPPER_ID} .occupants, #${WRAPPER_ID} .chat-head, #${WRAPPER_ID} .chat-toolbar--container { display: none !important;  visibility: hidden !important; }</style>`,
    );

    const script = document.createElement('script');
    script.src = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.js';
    script.async = true;
    script.onload = () =>
      void initConverse(
        conferenceData!.state.conferenceToken!,
        conferenceData!.state.room!,
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

const initConverse = (conferenceToken: string, roomName: string): void => {
  // @ts-ignore : converse is loaded into window by script
  window.converse.plugins.add('diabetes-page', {
    initialize: function () {
      this._converse.api.listen.on('message', function (messageXML: any) {
        console.warn('message', messageXML);
      });
    },
  });

  // @ts-ignore : converse is loaded into window by script
  window.converse.initialize({
    whitelisted_plugins: ['diabetes-page'],
    view_mode: 'embedded',
    bosh_service_url: `https://localhost:8443/http-bind?token=${conferenceToken}`,
    authentication: 'anonymous',
    jid: 'meet.jitsi',
    auto_login: 'true',
    auto_join_rooms: [
      {
        jid: roomName + '@muc.meet.jitsi',
        nick: Math.round(Math.random() * 10000).toString(),
      },
    ],
  });
};
