import { CalendarApi } from '@fullcalendar/common';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  MenuItem,
  Slide,
  SlideProps,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

type AddAppointmentDialogProps = {
  open: boolean;
  onClose: () => void;
  calendarApi: CalendarApi | undefined;
};

export function AddAppointmentDialog({
  open,
  onClose,
  calendarApi,
}: AddAppointmentDialogProps): JSX.Element {
  const [trainingId, setTrainingId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const classes = useStyles();

  const addAppointment = (): void => {
    if (!calendarApi) {
      return;
    }

    onClose();

    // calendarApi.addEvent({
    //   title: `${formData.trainingName} with ${formData.groupName}`,
    //   start: formData.startDateTime,
    //   end: formData.endDateTime,
    //   extendedProps: {
    //     groupName: formData.groupName,
    //     groupId: formData.groupId,
    //     trainingName: formData.trainingName,
    //     trainingId: formData.trainingId,
    //   },
    // });
  };

  return (
    <Dialog
      open={open && !!calendarApi}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">New appointment</DialogTitle>
      <DialogContent>
        <form>
          {/* Appointment Training */}
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="add-appointment-training-select"
                select
                fullWidth
                label="Training"
                value={trainingId}
                variant="outlined"
                onChange={(event) =>
                  void setTrainingId(event.currentTarget.value)
                }
              >
                {trainings.map((training) => (
                  <MenuItem key={training.id} value={training.id}>
                    {training.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>

          {/* Appointment workingGroup */}
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="add-appointment-group-select"
                select
                fullWidth
                label="Group"
                value={groupId}
                variant="outlined"
                onChange={(event) => void setGroupId(event.currentTarget.value)}
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>

          {/* Appointment Start */}
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              fullWidth
              onChange={(event) => void setStartsAt(event.currentTarget.value)}
              value={startsAt}
              id="datetime-start"
              label="Appointment's starting Date and Time"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          {/* Appointment End */}
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              fullWidth
              onChange={(event) => void setEndsAt(event.currentTarget.value)}
              value={endsAt}
              id="datetime-end"
              label="Appointment's ending Date and Time"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </form>
      </DialogContent>

      {/* Cancel / Add Appointment Button */}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addAppointment} color="primary">
          Add appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Slide transition for add/update modals
const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref,
) {
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
