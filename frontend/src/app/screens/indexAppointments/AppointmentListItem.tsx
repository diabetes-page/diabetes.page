import { useNavigation } from '@react-navigation/native';
import { formatRFC7231, parseISO } from 'date-fns';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { UNIT } from '../../../config/style';
import { AppointmentInWorkingGroupResource } from '../../../utilities/requests/requests';
import { stacks } from '../../navigation/config';

type AppointmentListItemProps = {
  appointmentInGroup: AppointmentInWorkingGroupResource;
};

export function AppointmentListItem({
  appointmentInGroup,
}: AppointmentListItemProps): JSX.Element {
  const nav = useNavigation();

  return (
    <Card
      style={styles.card}
      onPress={() =>
        void nav.navigate(stacks.appointments.screens.conference.name, {
          id: appointmentInGroup.appointment.id,
        })
      }
    >
      <Card.Title
        title={
          <span>
            {formatRFC7231(parseISO(appointmentInGroup.appointment.startsAt))}
          </span>
        }
        subtitle={appointmentInGroup.appointment.presenter.user.name}
      />
      <Card.Content>
        <Paragraph>
          {appointmentInGroup.appointment.training?.name || 'No training'}
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: UNIT * 2,
    cursor: 'pointer',
  },
});
