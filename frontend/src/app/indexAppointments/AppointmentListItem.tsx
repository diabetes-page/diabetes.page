import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { toShowAppointmentPage } from '../../pages/appointments/[appointmentId]';
import { formatIsoDateString } from '../../utilities/misc/dates';
import { AppointmentInWorkingGroupResource } from '../../utilities/requests/requests';

type AppointmentListItemProps = {
  appointmentInGroup: AppointmentInWorkingGroupResource;
};

export function AppointmentListItem({
  appointmentInGroup,
}: AppointmentListItemProps): JSX.Element {
  const openAppointment = useOpenAppointment(appointmentInGroup);
  const classes = useStyles();

  return (
    <Card onClick={openAppointment} className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {formatIsoDateString(appointmentInGroup.appointment.startsAt)}
        </Typography>
        <Typography variant="h5" component="h2">
          {appointmentInGroup.appointment.training?.name ?? 'Appointment'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {appointmentInGroup.appointment.presenter.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

function useOpenAppointment(
  appointmentInGroup: AppointmentInWorkingGroupResource,
): () => void {
  const router = useRouter();

  return () =>
    void router.push(
      toShowAppointmentPage({
        appointmentId: appointmentInGroup.appointment.id,
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
  pos: {
    marginBottom: 12,
  },
}));
