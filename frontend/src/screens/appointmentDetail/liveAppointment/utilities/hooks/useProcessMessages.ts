import { useContext, useEffect } from 'react';
import {
  ConferenceContext,
  ConferenceDispatch,
} from '../conferenceContext/ConferenceContext';
import { useSendMessage } from './useSendMessage';
import { CONFERENCE_OFFICIAL_MESSAGE_PREPEND } from '../../../../../config/constants/constants';
import { ConferenceState } from '../conferenceContext/state';

export const useProcessMessages = (): void => {
  const conference = useContext(ConferenceContext);
  const converseAPILoaded = !!conference!.state.converseAPI;
  const sendMessage = useSendMessage();

  useEffect(() => {
    if (converseAPILoaded) {
      conference!.state.converseAPI!.listen.on('message', function (
        message: Message,
      ) {
        processMessage(message, sendMessage, conference!.state);
      });
    }
  }, [converseAPILoaded]);
};

type Message = {
  stanza: Node;
};

function processMessage(
  message: Message,
  sendMessage: (message: string) => void,
  conference: ConferenceState,
): void {
  const text = message.stanza.childNodes[0]?.textContent;
  const prepend = CONFERENCE_OFFICIAL_MESSAGE_PREPEND;

  if (
    text &&
    text.length >= prepend.length &&
    text.substr(0, prepend.length) === prepend
  ) {
    const signedCommand = text.substr(prepend.length);
    processSignedCommand(signedCommand, sendMessage, conference);
  }

  console.warn('vr', 'got text:', text);

  // if (text !== '138923') {
  //   console.warn('vr', 'sending reply');
  //   sendMessage('138923');
  // }
}

function processSignedCommand(
  signedCommand: string,
  sendMessage: (message: string) => void,
  conference: ConferenceState,
): void {}
