import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { UNIT } from '../../../config/style';
import { AppointmentResource } from '../../../utilities/requests/requests';

type AppointmentListItemProps = { appointment: AppointmentResource };
export function AppointmentListItem({
  appointment,
}: AppointmentListItemProps): JSX.Element {
  return (
    <Card style={styles.card}>
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
  },
});
