import React from 'react';

const WRAPPER_ID = 'conversejs';

export function Converse(): JSX.Element {
  return <div id={WRAPPER_ID} style={{ flex: '50%' }} />;
}

// const useConverse = (): Promise<void> =>
//     new Promise((resolve) =>
//         useEffect(() => {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.js';
//           script.async = true;
//           script.onload = () => void resolve();
//           document.body.appendChild(script);
//
//           const link = document.createElement('link');
//           link.rel = 'stylesheet';
//           link.type = 'text/css';
//           link.href = 'https://cdn.conversejs.org/6.0.1/dist/converse.min.css';
//           document.head.appendChild(link);
//
//           return () => void document.body.removeChild(script);
//         }, []),
//     );

// jitsiPromise.then((userId) =>
//     conversePromise.then(() => {
//       // @ts-ignore
//       window.converse.initialize({
//         view_mode: 'embedded',
//         bosh_service_url: 'https://localhost:8443/http-bind',
//         authentication: 'login',
//         auto_login: 'true',
//         jid: 'user@meet.jitsi',
//         password: 'pass',
//         auto_join_rooms: [
//           //ROOM_NAME + '@muc.meet.jitsi',
//           { jid: ROOM_NAME + '@muc.meet.jitsi', nick: userId },
//         ],
//       });
//     }),
// );
