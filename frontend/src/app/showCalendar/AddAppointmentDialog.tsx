import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  TextField,
} from '@material-ui/core';
import React, { SetStateAction, useState } from 'react';

const initialFormState = {
  training: '',
  group: '',
  startDateTime: '',
  endDateTime: '',
};

type AppointmentDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};
export function AddAppointmentDialog({
  isOpen,
  setIsOpen,
}: AppointmentDialogProps): JSX.Element {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormState);

  const addAppointment = (): void => {
    //   if we can get selectInfo here, we can do this:
    //   const calendarApi = selectInfo.view.calendar;
    //
    //   calendarApi.unselect() // clear date selection
    //
    //   calendarApi.addEvent({
    //     id: some id (uuid)?
    //     title: formData.title
    //     start: formData.startStr
    //     end: formData.endStr,
    //   })
    //   This can then be picked up and sent to the database in handleEventAdded

    // Reset the form data before we leave

    console.log('formData is: ', formData);
    closeDialog();
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
              <InputLabel
                className={classes.selectLabel}
                id="training-select-label"
              >
                Training
              </InputLabel>
              <Select
                fullWidth
                variant="outlined"
                labelId="training-select-label"
                id="training-select"
                onChange={(e): void =>
                  setFormData({ ...formData, training: e.target.value })
                }
              >
                <MenuItem value={11}>Training 1</MenuItem>
                <MenuItem value={21}>Training 2</MenuItem>
                <MenuItem value={31}>Training 3</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Appointment workingGroup */}
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel
                className={classes.selectLabel}
                id="group-select-label"
              >
                Group
              </InputLabel>
              <Select
                fullWidth
                variant="outlined"
                labelId="group-select-label"
                id="group-select"
                onChange={(e): void =>
                  setFormData({ ...formData, group: e.target.value })
                }
              >
                <MenuItem value={10}>Group 1</MenuItem>
                <MenuItem value={20}>Group 2</MenuItem>
                <MenuItem value={30}>Group 3</MenuItem>
              </Select>
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
