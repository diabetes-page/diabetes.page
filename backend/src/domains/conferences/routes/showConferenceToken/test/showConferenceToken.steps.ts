import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/utilities/testingUtilities';

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
