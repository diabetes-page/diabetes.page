export const SOCKET_AUTHENTICATE = 'SOCKET_AUTHENTICATE';
export interface SocketAuthenticate {
    event: typeof SOCKET_AUTHENTICATE;
    data: {
        conferenceToken: string;
    };
}

export type SocketPayload = SocketAuthenticate;