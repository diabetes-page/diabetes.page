import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { Strophe } from 'strophe.js';
import 'strophejs-plugin-muc';
import {
  JITSI_CHAT_PRESENCE_INTERVAL,
  JITSI_JID,
  JITSI_ROOM_ADDRESS,
  JITSI_WEBSOCKET_URL,
} from '../../../config/jitsi';
import { useConferenceRoomAndToken } from '../hooks/useConferenceRoomAndToken';

export type DisplayMessageFunction = (msg: string) => void;
export type SendMessageFunction = (msg: string) => void;
type ProcessChatUpdatesFunction = (chatElement: Element) => void;

export const useChat = (
  displayMessage: DisplayMessageFunction,
): SendMessageFunction => {
  const { conferenceRoom, conferenceToken } = useConferenceRoomAndToken();
  const processChatUpdates = useProcessChatUpdates(displayMessage);
  const connection = useRef<Strophe.Connection>();
  const stropheRoom = useRef<Strophe.MUC.XmppRoom>();

  useEffect(() => {
    connection.current?.reset();

    connection.current = new Strophe.Connection(
      `${JITSI_WEBSOCKET_URL}?chat=true&room=${conferenceRoom}&token=${conferenceToken}`,
    );

    connection.current.connect(JITSI_JID, undefined, (status) => {
      if (status !== Strophe.Status.CONNECTED) {
        return;
      }

      connection.current?.send($pres());

      connection.current?.muc.join(
        conferenceRoom + JITSI_ROOM_ADDRESS,
        Math.round(Math.random() * 10000).toString(), // todo: set nick
        () => false,
        (stanza: Element, room: Strophe.MUC.XmppRoom) => {
          stropheRoom.current = room;

          room.addHandler('message', (chatElement: Element): boolean => {
            processChatUpdates.current(chatElement);
            return true;
          });

          return false;
        },
        () => false,
      );
    });

    function endConnection(): void {
      if (connection.current) {
        connection.current.options.sync = true;
        connection.current.flush();
        connection.current.disconnect();
        connection.current = undefined;
      }
    }

    window.addEventListener('beforeunload', endConnection);

    return endConnection;
  }, [conferenceToken, conferenceRoom, processChatUpdates, connection]);

  setInterval(() => {
    connection.current?.send($pres());
  }, JITSI_CHAT_PRESENCE_INTERVAL);

  return useCallback((msg: string): void => {
    stropheRoom.current?.groupchat(msg);
  }, []);
};

// The reason why we use a ref here is so that the reference held by the handler that listens to room messages does not get stale.
// Compare https://itnext.io/why-you-need-to-understand-javascript-closures-53efa66ae11a
function useProcessChatUpdates(
  displayMessage: DisplayMessageFunction,
): MutableRefObject<ProcessChatUpdatesFunction> {
  const processChatUpdates = useRef<ProcessChatUpdatesFunction>(
    makeProcessChatUpdates(displayMessage),
  );

  useEffect(() => {
    processChatUpdates.current = makeProcessChatUpdates(displayMessage);
  }, [displayMessage]);

  return processChatUpdates;
}

function makeProcessChatUpdates(
  displayMessage: DisplayMessageFunction,
): ProcessChatUpdatesFunction {
  return (chatElement: Element): void => {
    const text = chatElement?.getElementsByTagName('body')?.[0]?.textContent;

    if (!text) {
      return;
    }

    displayMessage(text);
  };
}
