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
import React, { useEffect, useState } from 'react';
import { BasicWorkingGroupResource } from '../../../../../backend/src/domains/workingGroups/resources/BasicWorkingGroupResource';
import { useLoadingState } from '../../../utilities/hooks/hooks';
import {
  BasicTrainingResource,
  requests,
} from '../../../utilities/requests/requests';

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
  const [trainings, groups, loading] = useTrainingsAndGroups();
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

function useTrainingsAndGroups(): [
  trainings: BasicTrainingResource[] | undefined,
  groups: BasicWorkingGroupResource[] | undefined,
  loading: boolean,
] {
  const [trainings, setTrainings, loadingTrainings] = useLoadingState<
    BasicTrainingResource[]
  >();
  const [groups, setGroups, loadingGroups] = useLoadingState<
    BasicWorkingGroupResource[]
  >();

  useEffect(() => {
    // todo: error handling
    requests
      .indexTrainings()
      .then((response) => setTrainings(response.data.trainings));

    requests
      .indexWorkingGroups()
      .then((response) => setGroups(response.data.workingGroups));
  }, [setTrainings, setGroups]);

  return [trainings, groups, loadingTrainings || loadingGroups];
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
  },
}));