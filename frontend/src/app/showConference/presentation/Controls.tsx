import { Button } from '@material-ui/core';
import React from 'react';
import { SOCKET_SWITCH_SLIDE } from '../../../redux/live/SocketPayload';
import { useSelector } from '../../../redux/root/hooks';
import { FullTrainingResource } from '../../../utilities/requests/requests';

type Props = { training: FullTrainingResource };
export const Controls = ({ training }: Props): JSX.Element => {
  const user = useSelector((state) => state.user!);
  const conference = useSelector((state) => state.live.conference!);
  const sendToWebSocket = useSelector((state) => state.live.sendToWebSocket);
  const changeSlide = (delta: number) =>
    void sendToWebSocket?.({
      event: SOCKET_SWITCH_SLIDE,
      data: {
        slideIndex: conference.slideIndex + delta,
      },
    });

  if (!user.consultantId) {
    return <></>;
  }

  return (
    <>
      <Button
        onClick={() => void changeSlide(-1)}
        disabled={!sendToWebSocket || conference.slideIndex <= 0}
      >
        Previous slide
      </Button>
      <Button
        onClick={() => void changeSlide(+1)}
        disabled={
          !sendToWebSocket ||
          conference.slideIndex >= training.slides.length - 1
        }
      >
        Next slide
      </Button>
    </>
  );
};
