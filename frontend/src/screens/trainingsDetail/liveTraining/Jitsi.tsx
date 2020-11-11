import React from 'react';

const WRAPPER_ID = 'jitsi';

export function Jitsi(): JSX.Element {
  return <div id={WRAPPER_ID} style={{ flex: '50%' }} />;
}

// const useJitsi = (): Promise<string> =>
//   new Promise((resolve) =>
//     useEffect(() => {
//       const script = document.createElement('script');
//
//       script.src = 'https://localhost:8443/external_api.js';
//       script.async = true;
//       script.onload = (): void => {
//         const domain = 'localhost:8443';
//         const options = {
//           roomName: ROOM_NAME,
//           width: 700,
//           height: 700,
//           parentNode: document.getElementById(WRAPPER_ID),
//           interfaceConfigOverwrite: {
//             TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat', 'stats'],
//             TOOLBAR_ALWAYS_VISIBLE: true,
//             DISABLE_VIDEO_BACKGROUND: true,
//           },
//         };
//
//         // NOTE: It's a good practice to remove the conference before the page is unloaded.
//         // @ts-ignore
//         const jitsi = new window.JitsiMeetExternalAPI(domain, options);
//
//         jitsi.on('videoConferenceJoined', (data: Record<string, string>) => {
//           console.warn(data);
//           resolve(data.id);
//         });
//       };
//
//       document.body.appendChild(script);
//
//       return () => void document.body.removeChild(script);
//     }, []),
//   );
