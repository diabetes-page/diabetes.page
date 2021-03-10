import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { StandardScreen } from '../../../../components/StandardScreen';
import { useSelector } from '../../../../redux/root/hooks';
import { useLoadingState } from '../../../../utilities/hooks/hooks';
import {
  AppointmentResource,
  FullTrainingResource,
  requests,
} from '../../../../utilities/requests/requests';
import { Controls } from './Controls';
import { Slide } from './Slide';

export const Presentation = (): JSX.Element => {
  const appointment = useSelector((state) => state.live.appointment!);
  const [training, loading] = useTraining(appointment);

  if (loading || !training) {
    return (
      <StandardScreen>
        <ActivityIndicator animating />
      </StandardScreen>
    );
  }

  return (
    <View>
      <Slide training={training} />
      <Controls training={training} />
    </View>
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
