import {
  AppointmentResource,
  ConferenceResource,
} from '../../utilities/requests/requests';
import { SocketPayload } from './SocketPayload';

export const UPDATE_CONFERENCE = 'UPDATE_CONFERENCE';
export interface UpdateConference {
  type: typeof UPDATE_CONFERENCE;
  conference: ConferenceResource;
}

export const END_CONFERENCE = 'END_CONFERENCE';
export interface EndConference {
  type: typeof END_CONFERENCE;
}

export const SET_CONFERENCE_TOKEN = 'SET_CONFERENCE_TOKEN';
export interface SetConferenceToken {
  type: typeof SET_CONFERENCE_TOKEN;
  conferenceToken: string;
}

export const SET_APPOINTMENT = 'SET_APPOINTMENT';
export interface SetAppointment {
  type: typeof SET_APPOINTMENT;
  appointment: AppointmentResource;
}

export const SET_SEND_TO_WEB_SOCKET = 'SET_SEND_TO_WEB_SOCKET';
export interface SetSendToWebSocket {
  type: typeof SET_SEND_TO_WEB_SOCKET;
  sendToWebSocket: ((payload: SocketPayload) => void) | undefined;
}
