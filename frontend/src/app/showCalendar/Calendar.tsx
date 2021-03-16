// organize-imports-ignore
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles, Box } from '@material-ui/core';
import React, { SetStateAction, useState } from 'react';
import { useSelector } from '../../redux/root/hooks';
import { AppointmentInWorkingGroupResource } from '../../utilities/requests/requests';
import { AddAppointmentDialog } from './calendarDialogs/AddAppointmentDialog';
import { ViewAppointmentDialog } from './calendarDialogs/ViewAppointmentDialog';

type CalendarProps = {
  appointments: AppointmentInWorkingGroupResource[];
  setAppointments: React.Dispatch<
    SetStateAction<AppointmentInWorkingGroupResource[]>
  >;
};

const trainings = [
  {
    id: 123,
    name: 'Training 1',
  },
  {
    id: 124,
    name: 'Training 2',
  },
  {
    id: 125,
    name: 'Training 3',
  },
  {
    id: 126,
    name: 'Training 4',
  },
];
const groups = [
  {
    id: 123,
    name: 'Group 1',
  },
  {
    id: 124,
    name: 'Group 2',
  },
  {
    id: 125,
    name: 'Group 3',
  },
  {
    id: 126,
    name: 'Group 4',
  },
];

export function Calendar({
  appointments,
  setAppointments,
}: CalendarProps): JSX.Element {
  const userId = useSelector((state) => state.user.id);
  const classes = useStyles();
  const [addDialogOpen, setAddModalOpen] = useState(false);
  const [viewDialogOpen, setViewModalOpen] = useState(false);
  const [selected, setSelected] = useState<EventClickArg | DateSelectArg>();

  // Show eventAdd popup when date is selected
  const handleDateSelected = (selectInfo: DateSelectArg): void => {
    // we need to pass selectInfo through to the modal so that it can add an event to calendarApi
    setSelected(selectInfo);
    setAddModalOpen(true);
  };

  // Show event edit dialog when event is clicked
  const handleAppointmentClicked = (clickInfo: EventClickArg): void => {
    setSelected(clickInfo);
    setViewModalOpen(true);
  };

  // Called when an event has been added via the calendar
  const handleAppointmentAdded = (event: EventContentArg): void => {
    // TODO: Update database with new appointment
    console.log('An event was added: ', event);
    console.log('title is: ', event.event.title);
    console.log('group is: ', event.event.extendedProps.group);
    console.log('training is: ', event.event.extendedProps.training);
    console.log('start time is: ', event.event.startStr);
    console.log('end time is: ', event.event.endStr);
    // update calendar with new id
  };

  // Called when an event has been updated via the calendar
  const handleAppointmentUpdated = (event: EventContentArg): void => {
    // TODO: Update database with updated values for this appointment
    console.log('An event was updated: ', event);
    //  This is the format of event - we just need to find out which prop changed and update it in database
    // {
    //   "oldEvent": {
    //   "title": "nice event",
    //     "start": "2021-03-16T14:08:02.774Z",
    //     "extendedProps": {
    //     "training": "testingTraining",
    //       "group": "Group 1"
    //   }
    // },
    //   "event": {
    //   "title": "nice event",
    //     "start": "2021-03-16T14:08:02.774Z",
    //     "extendedProps": {
    //     "training": "Group 1",
    //       "group": "Group 1"
    //   }
    // }
  };

  // Called when an event has been successfully removed from the calendar
  const handleAppointmentRemoved = (event: EventContentArg): void => {
    // TODO: Delete appointment from database
    console.log('An event was removed: ', event);
  };

  return (
    <>
      <Box className={classes.calendarContainer}>
        <AddAppointmentDialog
          selectedData={selected}
          isOpen={addDialogOpen}
          setIsOpen={setAddModalOpen}
          trainings={trainings}
          groups={groups}
        />
        <ViewAppointmentDialog
          selectedData={selected}
          isOpen={viewDialogOpen}
          setIsOpen={setViewModalOpen}
          trainings={trainings}
          groups={groups}
        />
        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          selectable={true}
          initialEvents={[
            {
              title: 'Training 1 with Group 1',
              start: new Date(),
              extendedProps: {
                trainingId: 'training1id',
                groupId: 'group1id',
                trainingName: 'training1id',
                groupName: 'group1id',
              },
            },
          ]}
          select={handleDateSelected}
          eventClick={handleAppointmentClicked}
          eventAdd={handleAppointmentAdded}
          eventChange={handleAppointmentUpdated}
          eventRemove={handleAppointmentRemoved}
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
}));
