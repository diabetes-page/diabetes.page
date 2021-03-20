import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { toShowAppointmentPage } from '../../pages/appointments/[appointmentId]';
import { formatIsoDateString } from '../../utilities/misc/dates';
import { renderIf } from '../../utilities/misc/rendering';
import { AppointmentWithWorkingGroupsResource } from '../../utilities/requests/requests';

type AppointmentListItemProps = {
  appointmentWithGroups: AppointmentWithWorkingGroupsResource;
};

export function AppointmentListItem({
  appointmentWithGroups,
}: AppointmentListItemProps): JSX.Element {
  const openAppointment = useOpenAppointment(appointmentWithGroups);
  const classes = useStyles();
  const training = appointmentWithGroups.appointment.training?.name;

  return (
    <Card onClick={openAppointment} className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {formatIsoDateString(appointmentWithGroups.appointment.startsAt)}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {appointmentWithGroups.workingGroups[0].name}
        </Typography>
        {renderIf(!!training)(
          <Typography color="textSecondary">{training}</Typography>,
        )}
        <Typography color="textSecondary">
          {appointmentWithGroups.appointment.presenter.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

function useOpenAppointment(
  appointmentWithGroups: AppointmentWithWorkingGroupsResource,
): () => void {
  const router = useRouter();

  return () =>
    void router.push(
      toShowAppointmentPage({
        appointmentId: appointmentWithGroups.appointment.id,
      }),
    );
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
}));
