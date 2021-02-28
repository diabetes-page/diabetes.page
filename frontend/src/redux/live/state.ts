import {
  AppointmentResource,
  ConferenceResource,
} from '../../utilities/requests/requests';
import { SocketPayload } from './SocketPayload';

export type FilledLiveState = {
  conference: ConferenceResource;
  appointment: AppointmentResource;
  conferenceToken: string;
  sendToWebSocket: (payload: SocketPayload) => void;
};

export type LiveState = Partial<FilledLiveState>;
