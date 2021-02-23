import { ConferenceResource } from '../../utilities/requests/requests';

export type FilledConferenceState = {
  conference: ConferenceResource;
  conferenceToken: string;
};

export type ConferenceState = Partial<FilledConferenceState>;
