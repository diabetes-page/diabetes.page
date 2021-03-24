import React, { useEffect } from 'react';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardLoadingPage } from '../../components/StandardLoadingPage';
import { StandardPage } from '../../components/StandardPage';
import { useSelector } from '../../redux/root/hooks';
import { useLoadingState } from '../../utilities/hooks/hooks';
import {
  AppointmentWithWorkingGroupsResource,
  requests,
} from '../../utilities/requests/requests';
import { Calendar } from './Calendar';

export function ShowCalendar(): JSX.Element {
  const [appointments, setAppointments, isLoading] = useLoadingState<
    AppointmentWithWorkingGroupsResource[]
  >();
  const user = useSelector((state) => state.user!);

  useEffect(() => {
    if (!user.consultantId) {
      return;
    }

    requests.indexConsultantAppointments(user.consultantId).then((response) => {
      setAppointments(response.data.appointments);
    });
  }, [setAppointments, user]);

  if (isLoading || !appointments) {
    return <StandardLoadingPage />;
  }

  return (
    <StandardPage>
      <StandardHeading>Calendar</StandardHeading>
      <Calendar initialAppointments={appointments} />
    </StandardPage>
  );
}
