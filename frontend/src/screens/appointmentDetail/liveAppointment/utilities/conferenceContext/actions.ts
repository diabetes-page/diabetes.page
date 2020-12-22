export const INIT_CONFERENCE = 'INIT_CONFERENCE';
interface initConferenceAction {
  type: typeof INIT_CONFERENCE;
  conferenceRoom: string;
  conferenceToken: string;
  presentationIndex: number;
}

export const REGISTER_CONVERSE_API = 'REGISTER_CONVERSE_API';
interface registerConverseAPIAction {
  type: typeof REGISTER_CONVERSE_API;
  converseAPI: Record<any, any>;
}

export type ConferenceAction = initConferenceAction | registerConverseAPIAction;

export const initConference = (
  conferenceRoom: string,
  conferenceToken: string,
  presentationIndex: number,
): ConferenceAction => ({
  type: INIT_CONFERENCE,
  conferenceRoom,
  conferenceToken,
  presentationIndex,
});

export const registerConverseAPI = (
  converseAPI: Record<any, any>,
): ConferenceAction => ({
  type: REGISTER_CONVERSE_API,
  converseAPI,
});
