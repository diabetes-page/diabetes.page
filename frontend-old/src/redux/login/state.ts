type FilledLoginState = {
  loggedIn: boolean;
};

export type LoginState = Record<string, never> | FilledLoginState;
