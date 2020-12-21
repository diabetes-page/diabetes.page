import {
  ConferenceAction,
  REGISTER_CONVERSE_API,
  SET_ROOM_DATA,
} from './actions';

export type ConferenceState = {
  room: string | undefined;
  conferenceToken: string | undefined;
  converseAPI: Record<any, any> | undefined;
};

export const initialState: ConferenceState = {
  room: undefined,
  conferenceToken: undefined,
  converseAPI: undefined,
};

export const reducer = (
  state: ConferenceState,
  action: ConferenceAction,
): ConferenceState => {
  switch (action.type) {
    case SET_ROOM_DATA:
      return {
        ...state,
        conferenceToken: action.conferenceToken,
        room: action.room,
      };
    case REGISTER_CONVERSE_API:
      return {
        ...state,
        converseAPI: action.converseAPI,
      };
  }

  return state;
};
