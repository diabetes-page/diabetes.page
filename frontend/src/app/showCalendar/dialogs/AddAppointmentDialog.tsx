import { CalendarApi } from '@fullcalendar/common';
import { makeStyles, MenuItem, Typography } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { formatISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BasicWorkingGroupResource } from '../../../../../backend/src/domains/workingGroups/resources/BasicWorkingGroupResource';
import { ErrorList } from '../../../components/ErrorList';
import { Loader } from '../../../components/Loader';
import { StandardDialog } from '../../../components/StandardDialog';
import { StandardTextField } from '../../../components/StandardTextField';
import { useSafeDispatch } from '../../../redux/root/hooks';
import { SET_SNACKBAR } from '../../../redux/snackbar/actions';
import { useLoadingState } from '../../../utilities/hooks/hooks';
import { useError } from '../../../utilities/misc/errors';
import {
  AxiosError,
  BasicTrainingResource,
  CreateAppointmentParameters,
  requests,
} from '../../../utilities/requests/requests';
import { appointmentToEvent } from '../Calendar';

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
  const [groupId, setGroupId] = useState('');
  const [startsAt, setStartsAt] = useState<Date | null>(new Date());
  const [endsAt, setEndsAt] = useState<Date | null>(new Date());
  const [trainingId, setTrainingId] = useState('');
  const [error, resetError, onError] = useError<CreateAppointmentParameters>();
  const classes = useStyles();

  const addAppointment = useAddAppointment(
    groupId,
    startsAt,
    endsAt,
    trainingId,
    onClose,
    resetError,
    onError,
    calendarApi,
  );

  return (
    <StandardDialog
      title="New appointment"
      open={open && !!calendarApi}
      onClose={onClose}
      onOk={addAppointment}
      okButtonText="Add appointment"
      id="add-appointment-dialog"
      okDisabled={
        loading || !trainings || !groups || groups.length === 0 || !groupId
      }
    >
      {loading || !trainings || !groups ? (
        <Loader />
      ) : (
        <>
          {groups.length === 0 ? (
            <Typography color="textSecondary" className={classes.margin}>
              You need to create a group before you can create appointments.
              {/*Todo: refer to groups page*/}
            </Typography>
          ) : (
            <>
              <ErrorList error={error} errorKey="workingGroupId" />

              <StandardTextField
                label="Group"
                value={groupId}
                onChange={(event) => void setGroupId(event.target.value)}
                id="add-appointment-group"
                error={Boolean(error && error.workingGroupId)}
                select
                withMargin
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </StandardTextField>

              <ErrorList error={error} errorKey="startsAt" />

              {/*Todo: localization*/}
              <DateTimePicker
                label="Start time"
                value={startsAt}
                onChange={setStartsAt}
                id="add-appointment-startsAt"
                inputVariant="outlined"
                className={clsx(classes.margin, classes.dateTimePicker)}
                error={Boolean(error && error.startsAt)}
                fullWidth
              />

              <ErrorList error={error} errorKey="endsAt" />

              <DateTimePicker
                label="End time"
                value={endsAt}
                onChange={setEndsAt}
                id="add-appointment-endsAt"
                inputVariant="outlined"
                className={clsx(classes.margin, classes.dateTimePicker)}
                error={Boolean(error && error.endsAt)}
                fullWidth
              />

              <ErrorList error={error} errorKey="trainingId" />

              <StandardTextField
                label="Training"
                value={trainingId}
                onChange={(event) => void setTrainingId(event.target.value)}
                id="add-appointment-training"
                SelectProps={{
                  displayEmpty: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(error && error.trainingId)}
                select
              >
                <MenuItem value="">No training selected</MenuItem>
                {trainings.map((training) => (
                  <MenuItem key={training.id} value={training.id}>
                    {training.name}
                  </MenuItem>
                ))}
              </StandardTextField>
            </>
          )}
        </>
      )}
    </StandardDialog>
  );
}

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

function useAddAppointment(
  workingGroupId: string,
  startsAt: Date | null,
  endsAt: Date | null,
  trainingId: string,
  onClose: () => void,
  resetError: () => void,
  onError: (e: AxiosError<CreateAppointmentParameters>) => void,
  calendarApi: CalendarApi | undefined,
): () => void {
  const dispatch = useSafeDispatch();

  return (): void => {
    if (!calendarApi || !startsAt || !endsAt) {
      return;
    }

    requests
      .createAppointment({
        startsAt: formatISO(startsAt),
        endsAt: formatISO(endsAt),
        workingGroupId,
        trainingId: trainingId || null,
      })
      .then((response) => {
        onClose();

        calendarApi.addEvent(appointmentToEvent(response.data));

        dispatch({
          type: SET_SNACKBAR,
          message: 'The appointment was created successfully.',
          variant: 'success',
        });

        resetError();
      })
      .catch(onError);
  };
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  dateTimePicker: {
    cursor: 'pointer',
  },
}));
