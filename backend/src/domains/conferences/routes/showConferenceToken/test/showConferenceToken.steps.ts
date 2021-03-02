import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/testingUtilities';
import { Appointment } from '../../../../appointments/entities/Appointment.entity';
import { WorkingGroup } from '../../../../workingGroups/entities/WorkingGroup.entity';

Then(/^the response contains a conference token$/, function () {
  expect(this.response.body.conferenceToken).to.be.a('string');
});

When(
  /^I request the conference token for the training "([^"]*)" presented by "([^"]*)" in the working group "([^"]*)"$/,
  async function (trainingName, presenterName, workingGroupName) {
    const appointment = await getAppointment(trainingName, presenterName);
    const workingGroup = (await WorkingGroup.findOne({
      name: workingGroupName,
    }))!;

    this.response = await testRequest(
      'GET',
      `/working-groups/${workingGroup.id}/appointments/${appointment.id}/conference/token`,
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
