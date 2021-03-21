import { DateSelectArg } from '@fullcalendar/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  makeStyles,
  MenuItem,
  Slide,
  TextField,
} from '@material-ui/core';
import React, { SetStateAction, useState } from 'react';
import {
  BasicTrainingResource,
  BasicWorkingGroupResource,
} from '../../../utilities/requests/requests';

const initialFormState = {
  trainingName: '',
  trainingId: '',
  groupName: '',
  groupId: '',
  startDateTime: '',
  endDateTime: '',
};

type AddAppointmentDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedData: DateSelectArg;
  trainings: BasicTrainingResource[];
  groups: BasicWorkingGroupResource[];
};

export function AddAppointmentDialog({
  isOpen,
  setIsOpen,
  selectedData,
  trainings,
  groups,
}: AddAppointmentDialogProps): JSX.Element {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormState);

  // Adds an appointment (called an "event") locally via the calendarApi
  // This will get sent to the calendar and can be sent to backend in handleAppointmentAdded
  const addAppointment = (): void => {
    const calendarApi = selectedData.view.calendar;
    calendarApi.unselect(); // clear date selection

    // Add event to our calendar
    calendarApi.addEvent({
      title: `${formData.trainingName} with ${formData.groupName}`,
      start: formData.startDateTime,
      end: formData.endDateTime,
      extendedProps: {
        groupName: formData.groupName,
        groupId: formData.groupId,
        trainingName: formData.trainingName,
        trainingId: formData.trainingId,
      },
    });

    closeDialog();
  };

  // When training select is changed, update the trainingId and trainingName in state to the new selected values
  const handleChangeTraining = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setFormData({
      ...formData,
      trainingId: e.target.value,
      // We store the trainingName as a data attribute of each MenuItem, so get it from dataset
      trainingName: e.currentTarget.dataset.trainingName,
    });
  };

  // When training select is changed, update the trainingId and trainingName in state to the new selected values
  const handleChangeGroup = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setFormData({
      ...formData,
      groupId: e.target.value,
      // We store the groupName as a data attribute of each MenuItem, so get it from dataset
      groupName: e.currentTarget.dataset.groupName,
    });
  };

  const closeDialog = (): void => {
    setFormData(initialFormState);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Add new appointment
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the information for your new appointment
        </DialogContentText>
        <form>
          {/* Appointment Training */}
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="add-appointment-training-select"
                select
                fullWidth
                label="Training"
                value={formData.trainingId}
                variant="outlined"
                onChange={handleChangeTraining}
              >
                {trainings.map((training) => (
                  <MenuItem
                    data-training-name={training.name}
                    key={training.id}
                    value={training.id}
                  >
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
                value={formData.groupId}
                variant="outlined"
                onChange={handleChangeGroup}
              >
                {groups.map((group) => (
                  <MenuItem
                    data-group-name={group.name}
                    key={group.id}
                    value={group.id}
                  >
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
              onChange={(e): void =>
                setFormData({ ...formData, startDateTime: e.target.value })
              }
              value={formData.startDateTime}
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
              onChange={(e): void =>
                setFormData({ ...formData, endDateTime: e.target.value })
              }
              value={formData.endDateTime}
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
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={addAppointment} color="primary">
          Add Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Slide transition for add/update modals
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
