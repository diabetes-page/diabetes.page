export const INIT_CONFERENCE = 'INIT_CONFERENCE';
interface initConferenceAction {
  type: typeof INIT_CONFERENCE;
  conferenceRoom: string;
  conferenceToken: string;
  officialMessagePublicKey: string;
  presentationIndex: number;
}

export const REGISTER_CONVERSE_API = 'REGISTER_CONVERSE_API';
interface registerConverseAPIAction {
  type: typeof REGISTER_CONVERSE_API;
  converseAPI: Record<any, any>;
}

export const SET_PRESENTATION_INDEX = 'SET_PRESENTATION_INDEX';
interface setPresentationIndexAction {
  type: typeof SET_PRESENTATION_INDEX;
  presentationIndex: number;
}

export type ConferenceAction =
  | initConferenceAction
  | registerConverseAPIAction
  | setPresentationIndexAction;

export const initConference = (
  conferenceRoom: string,
  conferenceToken: string,
  presentationIndex: number,
  officialMessagePublicKey: string,
): ConferenceAction => ({
  type: INIT_CONFERENCE,
  conferenceRoom,
  conferenceToken,
  presentationIndex,
  officialMessagePublicKey,
});

export const registerConverseAPI = (
  converseAPI: Record<any, any>,
): ConferenceAction => ({
  type: REGISTER_CONVERSE_API,
  converseAPI,
});

export const setPresentationIndex = (
  presentationIndex: number,
): ConferenceAction => ({
  type: SET_PRESENTATION_INDEX,
  presentationIndex,
});
