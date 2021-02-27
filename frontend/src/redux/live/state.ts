import {
  AppointmentResource,
  ConferenceResource,
} from '../../utilities/requests/requests';

export type FilledLiveState = {
  conference: ConferenceResource;
  appointment: AppointmentResource;
  conferenceToken: string;
};

export type LiveState = Partial<FilledLiveState>;
