import {
  AppointmentResource,
  ConferenceResource,
} from '../../utilities/requests/requests';

export type FilledConferenceState = {
  conference: ConferenceResource;
  appointment: AppointmentResource;
  conferenceToken: string;
};

export type ConferenceState = Partial<FilledConferenceState>;
