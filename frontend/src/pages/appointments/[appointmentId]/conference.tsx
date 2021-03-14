import React from 'react';
import { Main } from '../../../app/main/Main';
import { ShowConference } from '../../../app/showConference/ShowConference';

export type ShowConferencePageParams = {
  appointmentId: string;
};

export function toShowConferencePage(params: ShowConferencePageParams): string {
  return `/appointments/${params.appointmentId}/conference`;
}

export default function ShowConferencePage(): JSX.Element {
  return (
    <Main>
      <ShowConference />
    </Main>
  );
}
