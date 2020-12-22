import { useContext } from 'react';
import { ConferenceContext } from '../ConferenceContext/ConferenceContext';

export const useSendMessage = (): ((message: string) => void) => {
  const conference = useContext(ConferenceContext);

  return (message: string): void => {
    if (!conference || !conference.state.converseAPI || !conference.state.room) {
      return;
    }

    const chat = conference.state.converseAPI.chatviews.get(
        conference.state.room + '@muc.meet.jitsi', // Todo: refactor magic string
    );
    chat.sendMessage(message);
  };
};
