import { useNavigation } from '@react-navigation/native';
import { formatRFC7231, parseISO } from 'date-fns';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { UNIT } from '../../../config/style';
import { AppointmentWithWorkingGroupsResource } from '../../../utilities/requests/requests';
import { stacks } from '../../navigation/config';

type AppointmentListItemProps = {
  appointmentWithGroups: AppointmentWithWorkingGroupsResource;
};

export function AppointmentListItem({
  appointmentWithGroups,
}: AppointmentListItemProps): JSX.Element {
  const nav = useNavigation();

  return (
    <Card
      style={styles.card}
      onPress={() =>
        void nav.navigate(
          ...stacks.appointments.screens.show.getNavigationData(
            appointmentWithGroups.appointment.id,
          ),
        )
      }
    >
      <Card.Title
        title={
          <span>
            {formatRFC7231(
              parseISO(appointmentWithGroups.appointment.startsAt),
            )}
          </span>
        }
        subtitle={appointmentWithGroups.appointment.presenter.user.name}
      />
      <Card.Content>
        <Paragraph>
          {appointmentWithGroups.appointment.training?.name || 'No training'}
        </Paragraph>
        <Paragraph>
          {appointmentWithGroups.workingGroups
            .map((group) => group.name)
            .join(', ')}
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
