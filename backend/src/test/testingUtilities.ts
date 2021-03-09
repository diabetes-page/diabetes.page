import { expect } from 'chai';
import { Appointment } from '../domains/appointments/entities/Appointment.entity';
import { Training } from '../domains/trainings/entities/Training.entity';
import { eachPromise } from '../utilities/promises';

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
