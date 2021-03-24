import {
  EndConference,
  SetAppointment,
  SetConferenceToken,
  SetSendToWebSocket,
  UpdateConference,
} from '../live/actions';
import {
  DeregisterLoadingInitial,
  DeregisterLoadingRefreshing,
  RegisterLoadingInitial,
  RegisterLoadingRefreshing,
} from '../loading/actions';
import { SetLoggedIn } from '../login/actions';
import { SetSnackbar } from '../snackbar/actions';
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
  | RegisterLoadingRefreshing
  | DeregisterLoadingRefreshing
  | SetLoggedIn
  | UpdateConference
  | EndConference
  | SetConferenceToken
  | SetAppointment
  | SetSendToWebSocket
  | SetSnackbar;
