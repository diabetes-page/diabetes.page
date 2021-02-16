import { ConferenceResource } from '../../utilities/requests/requests';

export type FilledConferenceState = {
  conference: ConferenceResource;
  token: string;
};

export type ConferenceState = Partial<FilledConferenceState>;
