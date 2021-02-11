import React from 'react';
import { Card } from 'react-native-paper';

type AppointmentListItemProps = { name: string; presenter: string };
export function AppointmentListItem({
  name,
  presenter,
}: AppointmentListItemProps): JSX.Element {
  return (
    <Card>
      <Card.Title title={name} subtitle={presenter} />
    </Card>
  );
}
