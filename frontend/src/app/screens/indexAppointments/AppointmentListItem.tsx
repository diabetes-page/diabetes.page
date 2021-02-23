import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { UNIT } from '../../../config/style';
import { AppointmentResource } from '../../../utilities/requests/requests';
import { stacks } from '../../navigation/config';

type AppointmentListItemProps = { appointment: AppointmentResource };
export function AppointmentListItem({
  appointment,
}: AppointmentListItemProps): JSX.Element {
  const nav = useNavigation();

  return (
    <Card
      style={styles.card}
      onPress={() =>
        void nav.navigate(stacks.appointments.screens.conference.name, {
          id: appointment.id,
        })
      }
    >
      <Card.Title
        title={appointment.training?.name || 'No training'}
        subtitle={appointment.presenter.user.name}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: UNIT * 2,
    cursor: 'pointer',
  },
});
