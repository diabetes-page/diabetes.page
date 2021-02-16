import { Action } from '../root/actions';
import {
  END_CONFERENCE,
  SET_CONFERENCE_TOKEN,
  UPDATE_CONFERENCE,
} from './actions';
import { ConferenceState } from './state';

const initialState: ConferenceState = {};

export const conference = (
  state: ConferenceState = initialState,
  action: Action,
): ConferenceState => {
  switch (action.type) {
    case UPDATE_CONFERENCE:
      if (
        state.conference?.conferenceUpdateCounter &&
        state.conference.conferenceUpdateCounter >=
          action.conference.conferenceUpdateCounter
      ) {
        return state;
      }

      return {
        ...state,
        conference: action.conference,
      };
    case END_CONFERENCE:
      return initialState;
    case SET_CONFERENCE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
