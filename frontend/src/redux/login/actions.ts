export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export interface SetLoggedIn {
  type: typeof SET_LOGGED_IN;
  loggedIn: boolean;
}
