import * as WebSocket from 'ws';

export interface ConferenceClient extends WebSocket {
  isAuthenticated: boolean | undefined;
  canSendCommands: boolean | undefined;
  conferenceRoom: string | undefined;
}
