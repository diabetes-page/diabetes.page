import { ConferenceResource } from '../../utilities/requests/requests';

export const UPDATE_CONFERENCE = 'UPDATE_CONFERENCE';
export interface UpdateConference {
  type: typeof UPDATE_CONFERENCE;
  conference: ConferenceResource;
}

export const END_CONFERENCE = 'END_CONFERENCE';
export interface EndConference {
  type: typeof END_CONFERENCE;
}

export const SET_CONFERENCE_TOKEN = 'SET_CONFERENCE_TOKEN';
export interface SetConferenceToken {
  type: typeof SET_CONFERENCE_TOKEN;
  token: string;
}
