import { useContext, useEffect } from 'react';
import { ConferenceContext } from '../conferenceContext/ConferenceContext';
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

  console.warn('vr', 'got text:', text);

  // if (text !== '138923') {
  //   console.warn('vr', 'sending reply');
  //   sendMessage('138923');
  // }
}
