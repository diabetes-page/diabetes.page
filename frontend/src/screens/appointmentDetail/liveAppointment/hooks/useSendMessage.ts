import { useContext } from 'react';
import { ConferenceContext } from '../ConferenceContext/ConferenceContext';

export const useSendMessage = (): ((message: string) => void) => {
  const conference = useContext(ConferenceContext);
  const chat = conference!.state.converseAPI!.chatviews.get(
    conference!.state.room! + '@muc.meet.jitsi', // Todo: refactor magic string
  );

  return (message: string) => void chat.sendMessage(message);
};
