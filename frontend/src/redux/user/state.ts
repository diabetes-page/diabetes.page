export type FilledUserState = {
  id: number;
};

export type UserState = Record<string, never> | FilledUserState;
