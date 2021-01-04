import {
  ConferenceAction,
  INIT_CONFERENCE,
  REGISTER_STROPHE_ROOM,
  SET_PRESENTATION_INDEX,
} from './actions';
import { Strophe } from 'strophe.js';

export type ConferenceState = {
  conferenceRoom: string | undefined;
  conferenceToken: string | undefined;
  presentationIndex: number | undefined;
  officialMessagePublicKey: string | undefined;
  conferenceUpdateCounter: number | undefined;

  stropheRoom: Strophe.MUC.XmppRoom | undefined;
};

export const initialState: ConferenceState = {
  conferenceRoom: undefined,
  conferenceToken: undefined,
  presentationIndex: undefined,
  officialMessagePublicKey: undefined,
  conferenceUpdateCounter: undefined,

  stropheRoom: undefined,
};

export const reducer = (
  state: ConferenceState,
  action: ConferenceAction,
): ConferenceState => {
  console.warn('vr got action', action.type, action);

  if (
    'conferenceUpdateCounter' in action &&
    state.conferenceUpdateCounter !== undefined &&
    action.conferenceUpdateCounter <= state.conferenceUpdateCounter
  ) {
    console.warn('vr outdated update, skipping');
    return state;
  }

  switch (action.type) {
    case INIT_CONFERENCE:
      return {
        ...state,
        conferenceToken: action.conferenceToken,
        conferenceRoom: action.conferenceRoom,
        presentationIndex: action.presentationIndex,
        officialMessagePublicKey: action.officialMessagePublicKey,
      };
    case REGISTER_STROPHE_ROOM:
      return {
        ...state,
        stropheRoom: action.stropheRoom,
      };
    case SET_PRESENTATION_INDEX:
      return {
        ...state,
        presentationIndex: action.presentationIndex,
        conferenceUpdateCounter: action.conferenceUpdateCounter,
      };
  }

  return state;
};
