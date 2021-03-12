import React from 'react';
import { IndexAppointments } from '../app/indexAppointments/IndexAppointments';
import { Main } from '../app/main/Main';

export function toHomePage(): string {
  return '/';
}

export default function HomePage(): JSX.Element {
  return (
    <Main>
      <IndexAppointments />
    </Main>
  );
}
