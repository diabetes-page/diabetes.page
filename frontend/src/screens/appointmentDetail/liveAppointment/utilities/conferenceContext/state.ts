import {
  ConferenceAction,
  REGISTER_CONVERSE_API,
  INIT_CONFERENCE,
} from './actions';

export type ConferenceState = {
  conferenceRoom: string | undefined;
  conferenceToken: string | undefined;
  presentationIndex: number | undefined;
  converseAPI: Record<any, any> | undefined;
};

export const initialState: ConferenceState = {
  conferenceRoom: undefined,
  conferenceToken: undefined,
  presentationIndex: undefined,
  converseAPI: undefined,
};

export const reducer = (
  state: ConferenceState,
  action: ConferenceAction,
): ConferenceState => {
  switch (action.type) {
    case INIT_CONFERENCE:
      return {
        ...state,
        conferenceToken: action.conferenceToken,
        conferenceRoom: action.conferenceRoom,
        presentationIndex: action.presentationIndex,
      };
    case REGISTER_CONVERSE_API:
      return {
        ...state,
        converseAPI: action.converseAPI,
      };
  }

  return state;
};
