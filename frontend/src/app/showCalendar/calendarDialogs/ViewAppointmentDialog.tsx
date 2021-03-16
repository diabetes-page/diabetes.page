import { ChangeEvent, EventClickArg } from '@fullcalendar/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  MenuItem,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { SetStateAction, useEffect, useState } from 'react';
import { FullTrainingResource } from '../../../utilities/requests/requests';

const initialFormState = {
  trainingId: '',
  trainingName: '',
  groupId: '',
  groupName: '',
  startDateTime: '',
  endDateTime: '',
};

type ViewAppointmentDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedData: EventClickArg;
  trainings: FullTrainingResource[];
  groups: {
    id: string;
    name: string;
  };
};

export function ViewAppointmentDialog({
  isOpen,
  setIsOpen,
  selectedData,
  trainings,
  groups,
}: ViewAppointmentDialogProps): JSX.Element | null {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormState);

  // Handler for when user selects a new training from the training select
  const handleUpdateTraining = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const appointment = selectedData.event;
    const trainingName = e.currentTarget.dataset.trainingName;

    // Update our form state with our new training information
    setFormData({
      ...formData,
      trainingId: e.target.value,
      trainingName: trainingName,
    });

    // Update the calendar with our new training changes
    appointment.setProp('title', `${trainingName} with ${formData.groupName}`);
    appointment.setExtendedProp('trainingName', trainingName);
    appointment.setExtendedProp('trainingId', e.target.value);
  };

  // Handler for when user selects a new workingGroup from the group select
  const handleUpdateGroup = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const appointment = selectedData.event;
    const groupName = e.currentTarget.dataset.groupName;

    // Update our form state with the new group information
    setFormData({
      ...formData,
      groupId: e.target.value,
      groupName: groupName,
    });

    // Update the calendar with our new group changes
    appointment.setProp('title', `${formData.trainingName} with ${groupName}`);
    appointment.setExtendedProp('groupId', e.target.value);
    appointment.setExtendedProp('groupName', groupName);
  };

  // Handler for when user updates start time
  const handleUpdateStart = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const appointment = selectedData.event;
    setFormData({ ...formData, startDateTime: e.target.value });
    appointment.setStart(e.target.value);
  };

  // Handler for when user updates end time
  const handleUpdateEnd = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const appointment = selectedData.event;
    setFormData({ ...formData, endDateTime: e.target.value });
    appointment.setEnd(e.target.value);
  };

  // Handler for when user cancels the appointment
  const handleCancel = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const appointment = selectedData.event;
    appointment.remove();
    closeDialog();
  };

  const closeDialog = (): void => {
    setFormData(initialFormState);
    setIsOpen(false);
  };

  // When we get selectedData, put it into our formData state to populate our form
  const loadEventData = (): void => {
    // Sanity check to make sure we actually have a selected event to display
    if (
      !(typeof selectedData == 'undefined') &&
      !(typeof selectedData.event == 'undefined')
    ) {
      // Put our event data into state
      const eventData = {
        title: selectedData.event.title,
        startDateTime: selectedData.event.startStr,
        endDateTime: selectedData.event.endStr,
        groupId: selectedData.event.extendedProps.groupId,
        groupName: selectedData.event.extendedProps.groupName,
        trainingId: selectedData.event.extendedProps.trainingId,
        trainingName: selectedData.event.extendedProps.trainingName,
      };
      console.log('eventData is: ', eventData);
      setFormData(eventData);
    }
  };

  useEffect(() => {
    loadEventData();
  }, [selectedData]);

  // Hack to stop us accessing selectedData if it's undefined
  if (typeof selectedData == 'undefined') {
    return null;
  }
  if (typeof selectedData.event == 'undefined') {
    return null;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <Grid container justify="space-between">
          <Typography variant="h6">Your appointment details</Typography>
          <Button
            onClick={handleCancel}
            variant="contained"
            size="small"
            className={classes.deleteButton}
            startIcon={<DeleteIcon />}
          >
            Cancel Appointment
          </Button>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here are the details for your {formData.trainingName} appointment with{' '}
          {formData.groupName}
        </DialogContentText>

        {/* Grid that splits the dialog into 2 columns on md screens and up */}
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6} className={classes.gridColumn}>
            <TextField
              id="training-select"
              select
              fullWidth
              label="Appointment Training"
              value={formData.trainingId}
              onChange={handleUpdateTraining}
              variant="outlined"
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
          </Grid>

          <Grid item xs={12} md={6} className={classes.gridColumn}>
            <TextField
              id="group-select"
              select
              fullWidth
              label="Appointment Group"
              value={formData.groupId}
              onChange={handleUpdateGroup}
              variant="outlined"
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
          </Grid>
        </Grid>
      </DialogContent>
      {/* Ok Button */}
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Ok
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
