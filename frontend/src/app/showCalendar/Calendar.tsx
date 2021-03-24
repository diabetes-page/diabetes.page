// organize-imports-ignore
import FullCalendar, {
  EventClickArg,
  EventInput,
  EventApi,
} from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles, Paper, useTheme } from '@material-ui/core';
import { parseISO } from 'date-fns';
import React, { useMemo, useRef, useState } from 'react';
import { AppointmentWithWorkingGroupsResource } from '../../utilities/requests/requests';
import { ViewAppointmentDialog } from './dialogs/ViewAppointmentDialog';
import { AddAppointmentDialog } from './dialogs/AddAppointmentDialog';

type CalendarProps = {
  initialAppointments: AppointmentWithWorkingGroupsResource[];
};

export function Calendar({ initialAppointments }: CalendarProps): JSX.Element {
  const initialEvents: EventInput[] = useMemo(
    () => initialAppointments.map(appointmentToEvent),
    [initialAppointments],
  );
  const [editedEvent, setEditedEvent] = useState<EventApi | null>(null);
  const [newAppointmentDialogOpen, setNewAppointmentDialogOpen] = useState(
    false,
  );
  const calendarRef = useRef<FullCalendar | null>(null);
  const calenderApi = calendarRef.current?.getApi();
  const classes = useStyles();
  const theme = useTheme();

  // Todo: Localization
  return (
    <>
      <AddAppointmentDialog
        open={newAppointmentDialogOpen}
        onClose={() => void setNewAppointmentDialogOpen(false)}
        calendarApi={calenderApi}
      />
      <ViewAppointmentDialog
        event={editedEvent}
        closeDialog={() => void setEditedEvent(null)}
      />
      <Paper className={classes.calendarContainer}>
        <FullCalendar
          ref={calendarRef}
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'addEvent dayGridMonth,timeGridWeek,timeGridDay',
          }}
          customButtons={{
            addEvent: {
              text: 'New appointment',
              click: () => void setNewAppointmentDialogOpen(true),
            },
          }}
          initialView="dayGridMonth"
          initialEvents={initialEvents}
          eventClick={(clickInfo: EventClickArg) =>
            void setEditedEvent(clickInfo.event)
          }
          eventColor={theme.palette.primary.main}
        />
      </Paper>
    </>
  );
}

export function appointmentToEvent(
  appointmentWithGroups: AppointmentWithWorkingGroupsResource,
): EventInput {
  return {
    title: appointmentWithGroups.workingGroups[0].name,
    start: parseISO(appointmentWithGroups.appointment.startsAt),
    end: parseISO(appointmentWithGroups.appointment.endsAt),
    extendedProps: {
      appointmentWithGroups,
    },
  };
}

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    flex: 1,
    padding: theme.spacing(2),
  },
  '@global': {
    '.fc .fc-event': {
      cursor: 'pointer',
    },
    '.fc .fc-button-primary': {
      backgroundColor: theme.palette.primary.main,
      border: 'none',
    },
    '.fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active': {
      backgroundColor: theme.palette.text.primary,
    },
  },
}));
