import React, { useEffect } from 'react';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardLoadingPage } from '../../components/StandardLoadingPage';
import { StandardPage } from '../../components/StandardPage';
import { useSelector } from '../../redux/root/hooks';
import { useLoadingState } from '../../utilities/hooks/hooks';
import {
  AppointmentInWorkingGroupResource,
  requests,
} from '../../utilities/requests/requests';
import { Calendar } from './Calendar';

// TODO: Think about duplicate code here that we could reduce
export function ShowCalendar(): JSX.Element {
  const [appointments, setAppointments, isLoading] = useLoadingState<
    AppointmentInWorkingGroupResource[]
  >();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    requests.indexAppointmentsForUser(userId).then((response) => {
      setAppointments(response.data.appointments);
    });
  }, [setAppointments, userId]);

  if (isLoading || !appointments) {
    return <StandardLoadingPage />;
  }

  return (
    <StandardPage>
      <StandardHeading>My Calendar</StandardHeading>
      <Calendar appointments={appointments} setAppointments={setAppointments} />
    </StandardPage>
  );
}
