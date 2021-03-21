// organize-imports-ignore
import FullCalendar, {
  EventClickArg,
  EventChangeArg,
  EventAddArg,
  EventInput,
} from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, makeStyles, Paper, useTheme } from '@material-ui/core';
import React, { SetStateAction, useMemo, useState } from 'react';
import { useSelector } from '../../redux/root/hooks';
import { AppointmentWithWorkingGroupsResource } from '../../utilities/requests/requests';
import { parseISO } from 'date-fns';

type CalendarProps = {
  initialAppointments: AppointmentWithWorkingGroupsResource[];
};

function computeInitialEvents(
  initialAppointments: AppointmentWithWorkingGroupsResource[],
): EventInput[] {
  return initialAppointments.map((appointmentWithGroups) => ({
    title: appointmentWithGroups.workingGroups[0].name,
    start: parseISO(appointmentWithGroups.appointment.startsAt),
    end: parseISO(appointmentWithGroups.appointment.endsAt),
    extendedProps: {
      appointmentWithGroups,
    },
  }));
}

export function Calendar({ initialAppointments }: CalendarProps): JSX.Element {
  const initialEvents: EventInput[] = useMemo(
    () => computeInitialEvents(initialAppointments),
    [initialAppointments],
  );
  const classes = useStyles();
  const theme = useTheme();
  const handleAppointmentClicked = (clickInfo: EventClickArg): void => {};
  const handleAppointmentAdded = (event: EventAddArg): void => {};
  const handleAppointmentUpdated = (event: EventChangeArg): void => {};

  // Todo: Localization
  return (
    <Paper className={classes.calendarContainer}>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        initialEvents={initialEvents}
        eventClick={handleAppointmentClicked}
        eventAdd={handleAppointmentAdded}
        eventChange={handleAppointmentUpdated}
        eventColor={theme.palette.primary.main}
      />
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    flex: 1,
    padding: theme.spacing(2),
  },
}));
