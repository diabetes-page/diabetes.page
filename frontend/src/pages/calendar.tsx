import React from 'react';
import { Main } from '../app/main/Main';

export function toCalendarPage(): string {
  return '/calendar';
}

export default function CalendarPage(): JSX.Element {
  return (
    <Main>
      <ShowCalendar />
    </Main>
  );
}
