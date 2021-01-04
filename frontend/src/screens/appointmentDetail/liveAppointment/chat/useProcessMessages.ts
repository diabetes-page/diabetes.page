import { useContext, useEffect, useRef, useState } from 'react';

import * as nacl from 'tweetnacl';
import * as base64 from '@stablelib/base64';
import * as utf8 from '@stablelib/utf8';
import {
  ConferenceContext,
  ConferenceDispatch,
} from '../utilities/conferenceContext/ConferenceContext';
import {
  CONFERENCE_OFFICIAL_MESSAGE_PREPEND,
  JITSI_BOSH_URL,
  JITSI_JID,
  JITSI_ROOM_ADDRESS,
} from '../../../../config/constants/constants';
import {
  registerStropheRoom,
  setPresentationIndex,
} from '../utilities/conferenceContext/actions';
import { Strophe } from 'strophe.js';

export const useProcessMessages = (
  displayMessage: (msg: string) => void,
): void => {
  const conference = useContext(ConferenceContext);
  const [
    conferenceToken,
    conferenceRoom,
    officialMessagePublicKey,
    stropheRoom,
    dispatch,
  ] = [
    conference?.state.conferenceToken,
    conference?.state.conferenceRoom,
    conference?.state.officialMessagePublicKey,
    conference?.state.stropheRoom,
    conference?.dispatch,
  ];
  const connection = useRef<Strophe.Connection>();
  const messageHandler = useRef<number>();

  useEffect(() => {
    connection.current?.reset();

    connection.current = new Strophe.Connection(
      JITSI_BOSH_URL + conferenceToken,
    );

    connection.current.connect(JITSI_JID, undefined, (status) => {
      if (status !== Strophe.Status.CONNECTED) {
        return;
      }

      console.warn('vr connection established');

      connection.current?.send($pres());

      connection.current?.muc.join(
        conferenceRoom + JITSI_ROOM_ADDRESS,
        Math.round(Math.random() * 10000).toString(), // todo: set nick
        () => false,
        (stanza: Element, room: Strophe.MUC.XmppRoom) => {
          dispatch?.(registerStropheRoom(room));
          return false;
        },
        () => false,
      );
    });
  }, [conferenceToken, conferenceRoom, dispatch]);

  // Every time the conference properties changes, we need to redefine the callback listening to new incoming messages
  // Otherwise the callback will refer to an outdated version of the conference properties
  // This is a memory leak as described in https://itnext.io/why-you-need-to-understand-javascript-closures-53efa66ae11a
  // In order to turn off the old callback, we need to save it in a ref to refer to it later
  // This is especially true for the displayMessage variable, as it changes after every message
  useEffect(() => {
    if (!stropheRoom) {
      return;
    }

    console.warn('vr creating messageHandler');

    if (messageHandler.current) {
      stropheRoom.removeHandler(messageHandler.current);
    }

    messageHandler.current = stropheRoom.addHandler(
      'message',
      (message: Element): boolean => {
        processMessage(
          message,
          officialMessagePublicKey,
          dispatch,
          displayMessage,
        );
        return true;
      },
    );
  }, [officialMessagePublicKey, dispatch, displayMessage, stropheRoom]);
};

function processMessage(
  message: Element,
  publicKey: string | undefined,
  dispatch: ConferenceDispatch | undefined,
  displayMessage: (msg: string) => void,
): void {
  const text = message.getElementsByTagName('body')[0]?.textContent;
  const prepend = CONFERENCE_OFFICIAL_MESSAGE_PREPEND;

  console.warn('vr', 'got message:', text);

  if (!text) {
    return;
  }

  if (
    text.length >= prepend.length &&
    text.substr(0, prepend.length) === prepend
  ) {
    const signedMessage = text.substr(prepend.length);
    try {
      processSignedMessage(signedMessage, publicKey, dispatch);
    } catch {}
  } else {
    displayMessage(text);
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
    dispatch(
      setPresentationIndex(
        messageJSON.presentationIndex,
        messageJSON.conferenceUpdateCounter,
      ),
    );
  }
}
