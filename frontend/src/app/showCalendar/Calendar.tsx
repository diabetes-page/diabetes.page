// organize-imports-ignore
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles } from '@material-ui/core';
import React, { SetStateAction, useEffect } from 'react';
import { useSelector } from '../../redux/root/hooks';
import { AppointmentInWorkingGroupResource } from '../../utilities/requests/requests';

type CalendarProps = {
  appointments: AppointmentInWorkingGroupResource[];
  setAppointments: React.Dispatch<
    SetStateAction<AppointmentInWorkingGroupResource[]>
  >;
};

const handleDateSelect = (selectInfo: DateSelectArg): void => {
  console.log('Selected date: ', selectInfo);
};

const handleEventClick = (clickInfo: EventClickArg): void => {
  console.log('Event clicked: ', clickInfo);
};

const handleEvents = (events: EventApi[]): void => {
  console.log('Selected date: ', events);
};

// TODO: Think about duplicate code here that we could reduce
export function Calendar({
  appointments,
  setAppointments,
}: CalendarProps): JSX.Element {
  const userId = useSelector((state) => state.user.id);
  const classes = useStyles();

  useEffect(() => {
    console.log('Testing');
    console.log(appointments);
  }, []);
  // This component doesn't get rendered until appointments has been loaded in the parent
  return (
    <FullCalendar
      plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      nowIndicator={true}
      editable={true}
      selectable={true}
      initialEvents={[{ title: 'nice event', start: new Date() }]}
      select={handleDateSelect}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    flex: 1,
    minHeight: '100%',
    fontSize: 14,
  },
}));
