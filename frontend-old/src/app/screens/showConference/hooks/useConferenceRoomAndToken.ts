import { useSelector } from '../../../../redux/root/hooks';

export const useConferenceRoomAndToken = (): {
  conferenceRoom: string;
  conferenceToken: string;
} => {
  const conferenceRoom = useSelector(
    (state) => state.live.conference!.conferenceRoom,
  );
  const conferenceToken = useSelector((state) => state.live.conferenceToken!);

  return { conferenceRoom, conferenceToken };
};
