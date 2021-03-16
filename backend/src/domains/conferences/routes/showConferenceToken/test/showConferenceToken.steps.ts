import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/utilities/testingUtilities';
import { Appointment } from '../../../../appointments/entities/Appointment.entity';

Then(/^the response contains a conference token$/, function () {
  expect(this.response.body.conferenceToken).to.be.a('string');
});

When(
  /^I request the conference token for the training "([^"]*)" presented by "([^"]*)"$/,
  async function (trainingName, presenterName) {
    const appointment = await getAppointment(trainingName, presenterName);

    this.response = await testRequest(
      'GET',
      `/appointments/${appointment.id}/conference/token`,
      {},
      this.jwt,
    );
  },
);

Given(
  /^the appointment for the training "([^"]*)" presented by "([^"]*)" is( not | )running$/,
  async function (trainingName, presenterName, truthString: string) {
    const isRunning = truthString.trim() !== 'not';
    const appointment = await getAppointment(trainingName, presenterName);

    await Appointment.update(appointment.id, {
      isRunning,
    });
  },
);
