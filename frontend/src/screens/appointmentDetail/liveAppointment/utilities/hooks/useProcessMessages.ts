import { useContext, useEffect, useRef } from 'react';
import {
  ConferenceContext,
  ConferenceDispatch,
} from '../conferenceContext/ConferenceContext';
import { CONFERENCE_OFFICIAL_MESSAGE_PREPEND } from '../../../../../config/constants/constants';
import * as nacl from 'tweetnacl';
import * as base64 from '@stablelib/base64';
import * as utf8 from '@stablelib/utf8';
import { setPresentationIndex } from '../conferenceContext/actions';

export const useProcessMessages = (): void => {
  const conference = useContext(ConferenceContext);
  const [converseAPI, publicKey, dispatch] = [
    conference?.state.converseAPI,
    conference?.state.officialMessagePublicKey,
    conference?.dispatch,
  ];
  const subscriber = useRef<(message: Message) => void>();

  // Every time the conference properties changes, we need to redefine the callback listening to new converse messages
  // Otherwise the callback will refer to an outdated version of the conference
  // This is a memory leak as described in https://itnext.io/why-you-need-to-understand-javascript-closures-53efa66ae11a
  // In order to turn off the old callback, we need to save it in a ref to refer to it later
  useEffect(() => {
    if (!converseAPI) {
      return;
    }

    if (subscriber.current) {
      converseAPI.listen.not('message', subscriber.current);
    }

    subscriber.current = (message: Message): void => {
      processMessage(message, publicKey, dispatch);
    };

    converseAPI.listen.on('message', subscriber.current);
  }, [converseAPI, publicKey, dispatch]);
};

type Message = {
  stanza: Node;
};

function processMessage(
  message: Message,
  publicKey: string | undefined,
  dispatch: ConferenceDispatch | undefined,
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
      processSignedMessage(signedMessage, publicKey, dispatch);
    } catch {}
  }
}

function processSignedMessage(
  signedMessage: string,
  publicKey: string | undefined,
  dispatch: ConferenceDispatch | undefined,
): void {
  console.warn('vr', 'processing signed message:', signedMessage);

  let signedMessageArray;

  try {
    signedMessageArray = base64.decode(signedMessage);
  } catch {
    console.warn('Potential message could not be base64 decoded');
    return;
  }

  let publicKeyDecoded;
  try {
    if (!publicKey) {
      throw new Error();
    }
    publicKeyDecoded = base64.decode(publicKey);
  } catch {
    console.warn('OfficialMessagePublicKey could not be base64 decoded');
    return;
  }

  const messageArray = nacl.sign.open(signedMessageArray, publicKeyDecoded);

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

  processMessageJSON(messageJSON, dispatch);
}

function processMessageJSON(
  messageJSON: Record<string, any>,
  dispatch: ConferenceDispatch | undefined,
): void {
  if (!dispatch) {
    console.warn('Message was parsed, but cannot access dispatch');
    return;
  }

  if (typeof messageJSON.presentationIndex === 'number') {
    console.warn('vr', 'setting presentation index');
    dispatch(
      setPresentationIndex(
        messageJSON.presentationIndex,
        messageJSON.conferenceUpdateCounter,
      ),
    );
  }
}
