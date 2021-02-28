import { Action } from '../root/actions';
import {
  END_CONFERENCE,
  SET_APPOINTMENT,
  SET_CONFERENCE_TOKEN,
  SET_SEND_TO_WEB_SOCKET,
  UPDATE_CONFERENCE,
} from './actions';
import { LiveState } from './state';

const initialState: LiveState = {};

export const live = (
  state: LiveState = initialState,
  action: Action,
): LiveState => {
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
        conferenceToken: action.conferenceToken,
      };
    case SET_APPOINTMENT:
      return {
        ...state,
        appointment: action.appointment,
      };
    case SET_SEND_TO_WEB_SOCKET:
      return {
        ...state,
        sendToWebSocket: action.sendToWebSocket,
      };
    default:
      return state;
  }
};
