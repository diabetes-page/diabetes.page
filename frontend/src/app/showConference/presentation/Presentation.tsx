import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { Loader } from '../../../components/Loader';
import { useSelector } from '../../../redux/root/hooks';
import { useLoadingState } from '../../../utilities/hooks/hooks';
import {
  AppointmentResource,
  FullTrainingResource,
  requests,
} from '../../../utilities/requests/requests';
import { Controls } from './Controls';

// See https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const Slide = dynamic(() => import('./Slide'), { ssr: false });

export const Presentation = (): JSX.Element => {
  const appointment = useSelector((state) => state.live.appointment!);
  const [training, loading] = useTraining(appointment);

  if (loading || !training) {
    return <Loader />;
  }

  return (
    <div>
      <Slide training={training} />
      <Controls training={training} />
    </div>
  );
};

function useTraining(
  appointment: AppointmentResource,
): [FullTrainingResource | undefined, boolean] {
  const [
    training,
    setTraining,
    loading,
  ] = useLoadingState<FullTrainingResource>();

  useEffect(() => {
    requests
      .showAppointmentTraining(appointment.id)
      .then((data) => setTraining(data.data)); // Todo: Deal with errors
  }, [appointment, setTraining]);

  return [training, loading];
}
