import React from 'react';
import { Main } from '../../app/main/Main';
import { ShowAppointment } from '../../app/showAppointment/ShowAppointment';

export type ShowAppointmentPageParams = {
  appointmentId: string;
};

export function toShowAppointmentPage(
  params: ShowAppointmentPageParams,
): string {
  return `/appointments/${params.appointmentId}`;
}

export default function ShowAppointmentPage(): JSX.Element {
  return (
    <Main>
      <ShowAppointment />
    </Main>
  );
}
