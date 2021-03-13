import {
  EndConference,
  SetAppointment,
  SetConferenceToken,
  SetSendToWebSocket,
  UpdateConference,
} from '../live/actions';
import {
  DeregisterLoadingInitial,
  RegisterLoadingInitial,
} from '../loading/actions';
import { SetLoggedIn } from '../login/actions';
import { SetUser } from '../user/actions';

export const RESET_REDUX = 'RESET_REDUX';
export interface ResetRedux {
  type: typeof RESET_REDUX;
}

export type Action =
  | ResetRedux
  | SetUser
  | RegisterLoadingInitial
  | DeregisterLoadingInitial
  | SetLoggedIn
  | UpdateConference
  | EndConference
  | SetConferenceToken
  | SetAppointment
  | SetSendToWebSocket;
