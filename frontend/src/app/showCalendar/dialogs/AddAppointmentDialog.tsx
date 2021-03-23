import { CalendarApi } from '@fullcalendar/common';
import { makeStyles, MenuItem, Typography } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { BasicWorkingGroupResource } from '../../../../../backend/src/domains/workingGroups/resources/BasicWorkingGroupResource';
import { Loader } from '../../../components/Loader';
import { StandardDialog } from '../../../components/StandardDialog';
import { StandardTextField } from '../../../components/StandardTextField';
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
  const [startsAt, setStartsAt] = useState<Date | null>(new Date());
  const [endsAt, setEndsAt] = useState<Date | null>(new Date());
  const classes = useStyles();

  const addAppointment = (): void => {
    if (!calendarApi) {
      return;
    }

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
    <StandardDialog
      title="New appointment"
      open={open && !!calendarApi}
      onClose={onClose}
      onOk={addAppointment}
      okButtonText="Add appointment"
      id="add-appointment-dialog"
      okDisabled={loading || !trainings || !groups || groups.length === 0}
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
              <StandardTextField
                label="Group"
                value={groupId}
                onChange={(event) => void setGroupId(event.target.value)}
                id="add-appointment-group"
                select
                withMargin
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </StandardTextField>

              {/*Todo: localization*/}
              <DateTimePicker
                label="Start time"
                value={startsAt}
                onChange={setStartsAt}
                id="add-appointment-startsAt"
                inputVariant="outlined"
                className={clsx(classes.margin, classes.dateTimePicker)}
                fullWidth
              />

              <DateTimePicker
                label="End time"
                value={endsAt}
                onChange={setEndsAt}
                id="add-appointment-endsAt"
                inputVariant="outlined"
                className={clsx(classes.margin, classes.dateTimePicker)}
                fullWidth
              />

              <StandardTextField
                label="Training"
                value={trainingId}
                onChange={(event) => void setTrainingId(event.target.value)}
                id="add-appointment-training"
                select
              >
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

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  dateTimePicker: {
    cursor: 'pointer',
  },
}));
