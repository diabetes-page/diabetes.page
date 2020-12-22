import { useCallback, useContext } from 'react';
import { ConferenceContext } from '../conferenceContext/ConferenceContext';

export const useSendMessage = (): ((message: string) => void) => {
  const conference = useContext(ConferenceContext);

  return useCallback(
    (message: string): void => {
      console.warn('vr CHECK', conference?.state);

      if (
        !conference ||
        !conference.state.converseAPI ||
        !conference.state.conferenceRoom
      ) {
        return;
      }

      console.warn('vr CHECK CONVERSE');

      // @ts-ignore : converse is loaded into window by script
      const converse = window.converse;

      if (!converse) {
        return;
      }

      console.warn('vr SENDING MESSAGE');

      const messageObject = converse.env
        .$msg({
          from: conference.state.converseAPI.user.jid(),
          to: conference.state.conferenceRoom + '@muc.meet.jitsi',
          type: 'groupchat',
        })
        .c('body')
        .t(message.substring(1));

      conference.state.converseAPI.send(messageObject);
    },
    [conference],
  );
};
