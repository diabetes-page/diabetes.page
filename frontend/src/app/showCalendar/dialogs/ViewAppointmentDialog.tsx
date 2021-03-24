import { EventApi } from '@fullcalendar/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  SlideProps,
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

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref,
): JSX.Element {
  return <Slide direction="up" ref={ref} {...props} />;
});
