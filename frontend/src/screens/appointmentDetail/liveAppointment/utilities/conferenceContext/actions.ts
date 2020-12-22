export const SET_ROOM_DATA = 'SET_ROOM_DATA';
interface setRoomDataAction {
  type: typeof SET_ROOM_DATA;
  room: string;
  conferenceToken: string;
}

export const REGISTER_CONVERSE_API = 'REGISTER_CONVERSE_API';
interface registerConverseAPIAction {
  type: typeof REGISTER_CONVERSE_API;
  converseAPI: Record<any, any>;
}

export type ConferenceAction = setRoomDataAction | registerConverseAPIAction;

export const setRoomData = (
  room: string,
  conferenceToken: string,
): ConferenceAction => ({
  type: SET_ROOM_DATA,
  room,
  conferenceToken,
});

export const registerConverseAPI = (
  converseAPI: Record<any, any>,
): ConferenceAction => ({
  type: REGISTER_CONVERSE_API,
  converseAPI,
});

export const actions = { setRoomData, registerConverseAPI };
