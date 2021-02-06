import {
  DeregisterLoadingInitial,
  RegisterLoadingInitial,
} from '../loading/actions';
import { SetLoggedIn } from '../login/actions';
import { SetUser } from '../user/actions';

export type Action =
  | SetUser
  | RegisterLoadingInitial
  | DeregisterLoadingInitial
  | SetLoggedIn;
