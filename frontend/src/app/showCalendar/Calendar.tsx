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
import { makeStyles, Box } from '@material-ui/core';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from '../../redux/root/hooks';
import { AppointmentInWorkingGroupResource } from '../../utilities/requests/requests';
import { AddAppointmentDialog } from './AddAppointmentDialog';

type CalendarProps = {
  appointments: AppointmentInWorkingGroupResource[];
  setAppointments: React.Dispatch<
    SetStateAction<AppointmentInWorkingGroupResource[]>
  >;
};

// TODO: Think about duplicate code here that we could reduce
export function Calendar({
  appointments,
  setAppointments,
}: CalendarProps): JSX.Element {
  const userId = useSelector((state) => state.user.id);
  const classes = useStyles();
  const [addDialogOpen, setAddModalOpen] = useState(false);

  // Show eventAdd popup when date is selected
  const handleDateSelected = (selectInfo: DateSelectArg): void => {
    console.log('Selected date: ', selectInfo);

    // we need to pass selectInfo through to the modal so that it can add an event to calendarApi
    setAddModalOpen(true);
  };

  // Show event edit popup when event is clicked
  const handleEventClicked = (clickInfo: EventClickArg): void => {
    console.log('Event clicked: ', clickInfo);
  };

  // Called after events are initialized/added/changed/removed
  const handleEventsSet = (events: EventApi[]): void => {
    console.log('Something just changed in the calendar events: ', events);
  };

  // Called when an event has been added via the calendar
  const handleEventAdded = (event: EventContentArg): void => {
    console.log('An event was added: ', event);
  };

  // Called when an event has been updated via the popup
  const handleEventUpdated = (event: EventContentArg): void => {
    console.log('An event was updated: ', event);
  };

  // Called when an event has been successfully added to the EventApi
  const handleEventRemoved = (event: EventContentArg): void => {
    console.log('An event was removed: ', event);
  };

  useEffect(() => {
    console.log('Testing');
    console.log(appointments);
  }, [appointments]);

  // This component doesn't get rendered until appointments has been loaded in the parent
  return (
    <>
      <Box className={classes.calendarContainer}>
        <AddAppointmentDialog
          isOpen={addDialogOpen}
          setIsOpen={setAddModalOpen}
        />
        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          selectable={true}
          initialEvents={[{ title: 'nice event', start: new Date() }]}
          select={handleDateSelected}
          eventClick={handleEventClicked}
          eventsSet={handleEventsSet}
          eventAdd={handleEventAdded}
          eventUpdated={handleEventUpdated}
          eventRemove={handleEventRemoved}
        />
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    flex: 1,
    minHeight: '100%',
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
  },
  addDialogContainer: {
    minHeight: '100%',
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: 'red',
    padding: theme.spacing(2),
    maxWidth: '50%',
    maxHeight: '50%',
  },
}));
