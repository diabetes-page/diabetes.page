export const SOCKET_AUTHENTICATE = 'authenticate';
export interface SocketAuthenticate {
  event: typeof SOCKET_AUTHENTICATE;
  data: {
    conferenceToken: string;
  };
}

export const SOCKET_SWITCH_SLIDE = 'switch-slide';
export interface SocketSwitchSlide {
  event: typeof SOCKET_SWITCH_SLIDE;
  data: {
    slideIndex: number;
  };
}

export type SocketPayload = SocketAuthenticate | SocketSwitchSlide;
