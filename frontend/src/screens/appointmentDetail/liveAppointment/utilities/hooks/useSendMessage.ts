import { useContext } from 'react';
import { ConferenceContext } from '../conferenceContext/ConferenceContext';

export const useSendMessage = (): ((message: string) => void) => {
  const conference = useContext(ConferenceContext);

  return (message: string): void => {
    if (
      !conference ||
      !conference.state.converseAPI ||
      !conference.state.conferenceRoom
    ) {
      return;
    }

    // @ts-ignore : converse is loaded into window by script
    const converse = window.converse;

    if (!converse) {
      return;
    }

    const messageObject = converse.env
      .$msg({
        from: conference.state.converseAPI.user.jid(),
        to: conference.state.conferenceRoom + '@muc.meet.jitsi',
        type: 'groupchat',
      })
      .c('body')
      .t(message);

    conference.state.converseAPI.send(messageObject);
  };
};