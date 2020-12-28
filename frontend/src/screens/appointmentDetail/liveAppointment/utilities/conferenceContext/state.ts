import {
  ConferenceAction,
  INIT_CONFERENCE,
  REGISTER_CONVERSE_API,
  SET_PRESENTATION_INDEX,
} from './actions';

export type ConferenceState = {
  conferenceRoom: string | undefined;
  conferenceToken: string | undefined;
  presentationIndex: number | undefined;
  officialMessagePublicKey: string | undefined;
  converseAPI: Record<any, any> | undefined;
};

export const initialState: ConferenceState = {
  conferenceRoom: undefined,
  conferenceToken: undefined,
  presentationIndex: undefined,
  officialMessagePublicKey: undefined,
  converseAPI: undefined,
};

export const reducer = (
  state: ConferenceState,
  action: ConferenceAction,
): ConferenceState => {
  console.warn('vr reducer', action.type, action);
  switch (action.type) {
    case INIT_CONFERENCE:
      return {
        ...state,
        conferenceToken: action.conferenceToken,
        conferenceRoom: action.conferenceRoom,
        presentationIndex: action.presentationIndex,
        officialMessagePublicKey: action.officialMessagePublicKey,
      };
    case REGISTER_CONVERSE_API:
      return {
        ...state,
        converseAPI: action.converseAPI,
      };
    case SET_PRESENTATION_INDEX:
      return {
        ...state,
        presentationIndex: action.presentationIndex,
      };
  }

  return state;
};
