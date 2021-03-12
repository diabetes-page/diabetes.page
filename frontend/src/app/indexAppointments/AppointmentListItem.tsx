import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { formatIsoDateString } from '../../utilities/misc/dates';
import { AppointmentInWorkingGroupResource } from '../../utilities/requests/requests';

type AppointmentListItemProps = {
  appointmentInGroup: AppointmentInWorkingGroupResource;
};

export function AppointmentListItem({
  appointmentInGroup,
}: AppointmentListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card onClick={() => void 0} className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {formatIsoDateString(appointmentInGroup.appointment.startsAt)}
        </Typography>
        <Typography variant="h5" component="h2">
          {appointmentInGroup.appointment.training?.name || 'No training'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {appointmentInGroup.appointment.presenter.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
