import { useEffect, useRef } from 'react';
import { WEBSOCKET_URL } from '../../../../config/networking';
import { UPDATE_CONFERENCE } from '../../../../redux/live/actions';
import {
  SafeDispatch,
  useSafeDispatch,
  useSelector,
} from '../../../../redux/root/hooks';
import { SocketPayload, SOCKET_AUTHENTICATE } from '../socket/SocketPayload';

export const useCreateWebSocket = (): void => {
  const dispatch = useSafeDispatch();
  const conferenceToken = useSelector((state) => state.live.conferenceToken);
  const webSocket = useRef<WebSocket>();

  useEffect(() => {
    webSocket.current?.close();

    if (conferenceToken) {
      webSocket.current = buildWebSocket(conferenceToken, dispatch);
    }

    return () => void webSocket.current?.close();
  }, [dispatch, conferenceToken]);
};

// Todo: Refactor into own file
function buildWebSocket(
  conferenceToken: string,
  dispatch: SafeDispatch,
): WebSocket {
  const socket = new WebSocket(WEBSOCKET_URL);
  const sendToSocket = (payload: SocketPayload): void =>
    socket.send(JSON.stringify(payload));
  // Todo: Deal with WebSocket errors

  socket.addEventListener('open', () =>
    sendToSocket({
      event: SOCKET_AUTHENTICATE,
      data: { conferenceToken },
    }),
  );

  socket.addEventListener('message', function (event) {
    dispatch({
      type: UPDATE_CONFERENCE,
      conference: JSON.parse(event.data),
    });
  });

  return socket;
}
