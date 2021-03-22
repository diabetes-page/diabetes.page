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
      maxWidth="sm"
      open={open && !!calendarApi}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby="add-appointment-dialog-title"
      fullWidth
      keepMounted
    >
      <DialogTitle id="add-appointment-dialog-title">
        New appointment
      </DialogTitle>
      <DialogContent>
        <form>
          <FormControl fullWidth>
            <TextField
              label="Start time"
              type="datetime-local"
              value={startsAt}
              onChange={(event) => void setStartsAt(event.currentTarget.value)}
              InputLabelProps={{
                shrink: true,
              }}
              id="add-appointment-startsAt"
              variant="outlined"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin}>
            <TextField
              label="End time"
              type="datetime-local"
              value={endsAt}
              onChange={(event) => void setEndsAt(event.currentTarget.value)}
              InputLabelProps={{
                shrink: true,
              }}
              id="add-appointment-endsAt"
              variant="outlined"
              fullWidth
            />
          </FormControl>

          <FormControl className={classes.margin} fullWidth>
            <TextField
              label="Group"
              value={groupId}
              onChange={(event) => void setGroupId(event.target.value)}
              id="add-appointment-group"
              variant="outlined"
              select
              fullWidth
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl className={classes.margin} fullWidth>
            <TextField
              label="Training"
              value={trainingId}
              onChange={(event) => void setTrainingId(event.target.value)}
              id="add-appointment-training"
              variant="outlined"
              select
              fullWidth
            >
              {trainings.map((training) => (
                <MenuItem key={training.id} value={training.id}>
                  {training.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </form>
      </DialogContent>
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
  margin: {
    marginTop: theme.spacing(3),
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
