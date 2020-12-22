import { useContext, useEffect } from 'react';
import { ConferenceContext } from '../ConferenceContext/ConferenceContext';
import { useSendMessage } from './useSendMessage';

export const useProcessMessages = (): void => {
  const conference = useContext(ConferenceContext);
  const converseAPILoaded = !!conference!.state.converseAPI;
  const sendMessage = useSendMessage();

  useEffect(() => {
    if (converseAPILoaded) {
      conference!.state.converseAPI!.listen.on('message', function (
        message: Message,
      ) {
        processMessage(message, sendMessage);
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
): void {
  const text = message.stanza.childNodes[0]?.textContent;

  console.warn('vincent', 'got text:', text);

  if (text !== '138923') {
    console.warn('vincent', 'sending reply');
    sendMessage('138923');
  }
}
