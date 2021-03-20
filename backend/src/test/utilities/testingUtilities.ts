import { expect } from 'chai';
import { TableDefinition } from 'cucumber';
import { Appointment } from '../../domains/appointments/entities/Appointment.entity';
import { Training } from '../../domains/trainings/entities/Training.entity';
import { eachPromise } from '../../utilities/promises';

export async function getAppointment(
  trainingName: string,
  presenterName: string,
): Promise<Appointment> {
  const training = (await Training.findOne(
    { name: trainingName },
    {
      relations: ['appointments'],
    },
  ))!;
  const appointments: Appointment[] = [];
  await eachPromise(training.appointments, async (appointment) => {
    const presenter = await (await appointment.loadPresenter()).loadUser();
    if (presenter.name === presenterName) {
      appointments.push(appointment);
    }
  });
  expect(appointments).to.have.length(1);

  return appointments[0];
}

export function compareToTable(
  objects: Record<any, any>[],
  table: TableDefinition,
  test: CallableFunction,
): void {
  const expectations = table.hashes();

  expect(objects).to.have.length(expectations.length);

  expectations.forEach((expectedObject, index) => {
    const actualObject = objects[index];

    test(actualObject, expectedObject);
  });
}
