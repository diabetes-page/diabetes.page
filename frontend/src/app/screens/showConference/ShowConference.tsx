import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StandardScreen } from '../../../components/StandardScreen';
import { WEBSOCKET_URL } from '../../../config/networking';
import {
  SET_CONFERENCE_TOKEN,
  UPDATE_CONFERENCE,
} from '../../../redux/live/actions';
import {
  SafeDispatch,
  useSafeDispatch,
  useSelector,
} from '../../../redux/root/hooks';
import { requests } from '../../../utilities/requests/requests';

type ShowConferenceParams = {
  route: {
    params: {
      id: number;
    };
  };
};

export function ShowConference({ route }: ShowConferenceParams): JSX.Element {
  // todo:
  const hasConference = useSelector((state) => !!state.live.conference);
  useLive(route.params.id);

  if (!hasConference) {
    return (
      <StandardScreen>
        <ActivityIndicator animating />
      </StandardScreen>
    );
  }

  return <></>;
}

const useLive = (appointmentId: number): void => {
  useConferenceToken(appointmentId);
  useConferenceWebSocket();
};

const useConferenceToken = (appointmentId: number): void => {
  const dispatch = useSafeDispatch();

  useEffect(
    () =>
      void requests.showConferenceToken(appointmentId).then((response) => {
        dispatch({
          type: SET_CONFERENCE_TOKEN,
          conferenceToken: response.data.conferenceToken,
        });
      }),
    [dispatch, appointmentId],
  );
};

const useConferenceWebSocket = (): void => {
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
  // Todo: Deal with WebSocket errors

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        event: 'authenticate',
        data: {
          conferenceToken,
        },
      }),
    );
  });

  socket.addEventListener('message', function (event) {
    dispatch({
      type: UPDATE_CONFERENCE,
      conference: JSON.parse(event.data),
    });
  });

  return socket;
}
