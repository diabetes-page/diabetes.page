import React, { useEffect } from 'react';
import { WEBSOCKET_URL } from '../../../config/networking';
import { requests } from '../../../utilities/requests/requests';

type ShowConferenceParams = {
  route: {
    params: {
      id: number;
    };
  };
};

async function socketTest(appointmentId: number): Promise<void> {
  const conferenceToken = (await requests.showConferenceToken(appointmentId))
    .data.conferenceToken;
  const socket = new WebSocket(WEBSOCKET_URL);

  socket.addEventListener('message', function (event) {
    console.log('Message from server ', JSON.parse(event.data));
  });

  socket.addEventListener('error', function (event) {
    console.log('WebSocket error: ', event);
  });

  socket.addEventListener('close', function (event) {
    console.log('WebSocket close: ', event);
  });

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
}

export function ShowConference({ route }: ShowConferenceParams): JSX.Element {
  useEffect(() => void socketTest(route.params.id), [route.params.id]);

  return <></>;
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  // useConference(dispatch, route.params.id);
  //
  // return (
  //   <ConferenceContext.Provider value={contextValue}>
  //     {renderIf(state!.conferenceRoom === undefined)(
  //       () => (
  //         <StandardScreen>
  //           <ActivityIndicator animating />
  //         </StandardScreen>
  //       ),
  //
  //       () => (
  //         <ConferenceWrapper />
  //       ),
  //     )}
  //   </ConferenceContext.Provider>
  // );
}

// const useConference = (
//   dispatch: ConferenceDispatch,
//   appointmentId: number,
// ): void => {
//   return useEffect(
//     () =>
//       void requests.showConferenceData(appointmentId).then((response) => {
//         const {
//           conferenceRoom,
//           conferenceToken,
//           presentationIndex,
//           officialMessagePublicKey,
//           conferenceUpdateCounter,
//         } = response.data;
//         dispatch(
//           initConference(
//             conferenceRoom,
//             conferenceToken,
//             presentationIndex,
//             officialMessagePublicKey,
//             conferenceUpdateCounter,
//           ),
//         );
//       }),
//     [dispatch, appointmentId],
//   );
// };
