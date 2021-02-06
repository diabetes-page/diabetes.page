import { Strophe } from 'strophe.js';

export const INIT_CONFERENCE = 'INIT_CONFERENCE';
interface initConferenceAction {
  type: typeof INIT_CONFERENCE;
  conferenceRoom: string;
  conferenceToken: string;
  presentationIndex: number;
  officialMessagePublicKey: string;
  conferenceUpdateCounter: number;
}

export const REGISTER_STROPHE_ROOM = 'REGISTER_STROPHE_ROOM';
interface registerStropheRoomAction {
  type: typeof REGISTER_STROPHE_ROOM;
  stropheRoom: Strophe.MUC.XmppRoom;
}

export const SET_PRESENTATION_INDEX = 'SET_PRESENTATION_INDEX';
interface setPresentationIndexAction {
  type: typeof SET_PRESENTATION_INDEX;
  presentationIndex: number;
  conferenceUpdateCounter: number;
}

export type ConferenceAction =
  | initConferenceAction
  | registerStropheRoomAction
  | setPresentationIndexAction;

export const initConference = (
  conferenceRoom: string,
  conferenceToken: string,
  presentationIndex: number,
  officialMessagePublicKey: string,
  conferenceUpdateCounter: number,
): ConferenceAction => ({
  type: INIT_CONFERENCE,
  conferenceRoom,
  conferenceToken,
  presentationIndex,
  officialMessagePublicKey,
  conferenceUpdateCounter,
});

export const registerStropheRoom = (
  stropheRoom: Strophe.MUC.XmppRoom,
): ConferenceAction => ({
  type: REGISTER_STROPHE_ROOM,
  stropheRoom,
});

export const setPresentationIndex = (
  presentationIndex: number,
  conferenceUpdateCounter: number,
): ConferenceAction => ({
  type: SET_PRESENTATION_INDEX,
  presentationIndex,
  conferenceUpdateCounter,
});
