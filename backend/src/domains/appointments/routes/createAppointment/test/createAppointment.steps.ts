import { expect } from 'chai';
import { Given, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { Training } from '../../../../trainings/entities/Training.entity';

When(
  /^I create a new appointment for the training "([^"]*)" with start time "([^"]*)" and end time "([^"]*)"$/,
  async function (trainingName: string, startsAt: string, endsAt: string) {
    const training = (await Training.findOne({ name: trainingName }))!;
    this.response = await testRequest(
      'POST',
      `/trainings/${training.id}/appointments`,
      {
        startsAt,
        endsAt,
      },
      this.jwt,
    );
  },
);

Given(
  /^the training "([^"]*)" has exactly (\d+) appointments?$/,
  async function (trainingName: string, amount: number) {
    const training = (await Training.findOne({ name: trainingName }))!;
    const appointments = await training.loadAppointments();

    expect(appointments).to.have.length(amount);
  },
);
