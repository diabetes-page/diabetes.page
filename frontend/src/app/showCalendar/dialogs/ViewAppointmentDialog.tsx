import { EventApi } from '@fullcalendar/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { formatIsoDateString } from '../../../utilities/misc/dates';
import { AppointmentWithWorkingGroupsResource } from '../../../utilities/requests/requests';

type ViewAppointmentDialogProps = {
  event: EventApi | null;
  closeDialog: () => void;
};

export function ViewAppointmentDialog({
  event,
  closeDialog,
}: ViewAppointmentDialogProps): JSX.Element | null {
  const classes = useStyles();
  const appointmentWithGroups: AppointmentWithWorkingGroupsResource =
    event?.extendedProps?.appointmentWithGroups;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={!!event}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      aria-labelledby="view-appointment-dialog-title"
    >
      {appointmentWithGroups && (
        <>
          <DialogTitle id="view-appointment-dialog-title">
            {appointmentWithGroups?.workingGroups[0].name}
          </DialogTitle>

          <DialogContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head">Start</TableCell>
                  <TableCell>
                    {formatIsoDateString(
                      appointmentWithGroups.appointment.startsAt,
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">End</TableCell>
                  <TableCell>
                    {formatIsoDateString(
                      appointmentWithGroups.appointment.endsAt,
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Presenter</TableCell>
                  <TableCell>
                    {appointmentWithGroups.appointment.presenter.user.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Planned training</TableCell>
                  <TableCell>
                    {appointmentWithGroups.appointment.training?.name ||
                      'No training planned'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Ok
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(3),
    minWidth: 150,
  },
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectLabel: {
    marginLeft: theme.spacing(1),
  },
  grid: {
    marginTop: theme.spacing(3),
  },
  gridColumn: {
    paddingRight: theme.spacing(2),
  },
  deleteButton: {
    color: '#ffffff',
    backgroundColor: 'red',
  },
}));

const trainings = [
  {
    id: 123,
    name: 'Training 1',
  },
  {
    id: 124,
    name: 'Training 2',
  },
  {
    id: 125,
    name: 'Training 3',
  },
  {
    id: 126,
    name: 'Training 4',
  },
];
const groups = [
  {
    id: 123,
    name: 'Group 1',
  },
  {
    id: 124,
    name: 'Group 2',
  },
  {
    id: 125,
    name: 'Group 3',
  },
  {
    id: 126,
    name: 'Group 4',
  },
];
