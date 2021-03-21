// organize-imports-ignore
import FullCalendar, {
  EventClickArg,
  EventChangeArg,
  EventAddArg,
  EventInput,
  EventApi,
} from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles, Paper, useTheme } from '@material-ui/core';
import { parseISO } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { AppointmentWithWorkingGroupsResource } from '../../utilities/requests/requests';
import { ViewAppointmentDialog } from './dialogs/ViewAppointmentDialog';

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
  const [editedEvent, setEditedEvent] = useState<EventApi | null>(null);

  // Todo: Localization
  return (
    <>
      <ViewAppointmentDialog
        event={editedEvent}
        closeDialog={() => void setEditedEvent(null)}
      />
      <Paper className={classes.calendarContainer}>
        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          initialEvents={initialEvents}
          eventClick={(clickInfo: EventClickArg) =>
            void setEditedEvent(clickInfo.event)
          }
          eventColor={theme.palette.primary.main}
          editable
        />
      </Paper>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    flex: 1,
    padding: theme.spacing(2),
  },
}));
