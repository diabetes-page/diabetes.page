import { useEffect, useRef } from 'react';
import { WEBSOCKET_URL } from '../../../config/networking';
import {
  SET_SEND_TO_WEB_SOCKET,
  UPDATE_CONFERENCE,
} from '../../../redux/live/actions';
import {
  SocketPayload,
  SOCKET_AUTHENTICATE,
} from '../../../redux/live/SocketPayload';
import {
  SafeDispatch,
  useSafeDispatch,
  useSelector,
} from '../../../redux/root/hooks';

export const useCreateWebSocket = (): void => {
  const dispatch = useSafeDispatch();
  const conferenceToken = useSelector((state) => state.live.conferenceToken);
  const webSocket = useRef<WebSocket>();

  useEffect(() => {
    removeWebSocket(webSocket.current, dispatch);

    if (conferenceToken) {
      webSocket.current = buildWebSocket(conferenceToken, dispatch);
    }

    return () => void removeWebSocket(webSocket.current, dispatch);
  }, [dispatch, conferenceToken]);
};

function buildWebSocket(
  conferenceToken: string,
  dispatch: SafeDispatch,
): WebSocket {
  const socket = new WebSocket(WEBSOCKET_URL);
  const sendToWebSocket = (payload: SocketPayload): void =>
    socket?.send(JSON.stringify(payload));
  // Todo: Deal with WebSocket errors

  dispatch({
    type: SET_SEND_TO_WEB_SOCKET,
    sendToWebSocket,
  });

  socket.addEventListener('open', () =>
    sendToWebSocket({
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

function removeWebSocket(
  socket: WebSocket | undefined,
  dispatch: SafeDispatch,
): void {
  if (!socket) {
    return;
  }

  socket.close();

  dispatch({
    type: SET_SEND_TO_WEB_SOCKET,
    sendToWebSocket: undefined,
  });
}
