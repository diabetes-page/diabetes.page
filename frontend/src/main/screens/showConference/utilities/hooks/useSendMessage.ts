import { useCallback, useContext } from 'react';
import { ConferenceContext } from '../conferenceContext/ConferenceContext';

export const useSendMessage = (): ((message: string) => void) => {
  const conference = useContext(ConferenceContext);
  const stropheRoom = conference?.state.chatRoom;

  return useCallback(
    (message: string): void => {
      // const messageObject = converse.env
      //   .$msg({
      //     from: conference.state.converseAPI.user.jid(),
      //     to: conference.state.conferenceRoom + '@muc.meet.jitsi',
      //     type: 'groupchat',
      //   })
      //   .c('body')
      //   .t(message);

      console.warn('vr message send', message, stropheRoom);
      stropheRoom?.groupchat(message);
    },
    [stropheRoom],
  );
};
