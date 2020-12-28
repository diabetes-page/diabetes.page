import { useContext, useEffect } from 'react';
import {
  ConferenceContext,
  ConferenceControls,
} from '../conferenceContext/ConferenceContext';
import { CONFERENCE_OFFICIAL_MESSAGE_PREPEND } from '../../../../../config/constants/constants';
import * as nacl from 'tweetnacl';
import * as base64 from '@stablelib/base64';
import * as utf8 from '@stablelib/utf8';
import { setPresentationIndex } from '../conferenceContext/actions';

export const useProcessMessages = (): void => {
  const conference = useContext(ConferenceContext);
  const converseAPILoaded = !!conference!.state.converseAPI;

  useEffect(() => {
    if (converseAPILoaded) {
      conference!.state.converseAPI!.listen.on('message', function (
        message: Message,
      ) {
        // todo: conference will get stale!
        // todo: don't use tweetnacl-util on server side
        // todo: use message counter
        processMessage(message, conference);
      });
    }
  }, [converseAPILoaded]);
};

type Message = {
  stanza: Node;
};

function processMessage(
  message: Message,
  conference: ConferenceControls,
): void {
  const text = message.stanza.childNodes[0]?.textContent;
  const prepend = CONFERENCE_OFFICIAL_MESSAGE_PREPEND;

  console.warn('vr', 'got text:', text, 'prepend', prepend);

  if (
    text &&
    text.length >= prepend.length &&
    text.substr(0, prepend.length) === prepend
  ) {
    const signedMessage = text.substr(prepend.length);
    try {
      processSignedMessage(signedMessage, conference);
    } catch {}
  }
}

function processSignedMessage(
  signedMessage: string,
  conference: ConferenceControls,
): void {
  console.warn('vr', 'processing signed message:', signedMessage);

  let signedMessageArray;

  try {
    signedMessageArray = base64.decode(signedMessage);
  } catch {
    console.warn('Potential message could not be base64 decoded');
    return;
  }

  let publicKey;
  try {
    publicKey = base64.decode(conference!.state.officialMessagePublicKey!);
  } catch {
    console.warn('OfficialMessagePublicKey could not be base64 decoded');
    return;
  }

  const messageArray = nacl.sign.open(signedMessageArray, publicKey);

  if (messageArray === null) {
    console.warn('Potential message was not signed correctly');
    return;
  }

  let messageJSON: Record<string, any>;
  try {
    const messageJSONString = utf8.decode(messageArray);
    messageJSON = JSON.parse(messageJSONString);
  } catch {
    console.warn('Message was opened but contained corrupted data');
    return;
  }

  processMessageJSON(messageJSON, conference);
}

function processMessageJSON(
  messageJSON: Record<string, any>,
  conference: ConferenceControls,
): void {
  if (!conference) {
    console.warn('Message was parsed, but cannot access conference');
    return;
  }

  if (typeof messageJSON.presentationIndex === 'number') {
    console.warn('vr', 'setting presentation index');
    conference.dispatch(setPresentationIndex(messageJSON.presentationIndex));
  }
}
