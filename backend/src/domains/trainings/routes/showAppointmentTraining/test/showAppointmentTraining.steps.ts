import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/utilities/testingUtilities';

Given(
  /^I am interested in the appointment for the training "([^"]*)" presented by "([^"]*)"$/,
  async function (trainingName, presenterName) {
    this.appointment = await getAppointment(trainingName, presenterName);
  },
);

When(/^I request the appointment's training$/, async function () {
  this.response = await testRequest(
    'GET',
    `/appointments/${this.appointment.id}/training`,
    {},
    this.jwt,
  );
});

Then(
  /^the response contains a training with name "([^"]*)" and slides "([^"]*)"$/,
  function (trainingName, slidesString) {
    expect(this.response.body.name).to.equal(trainingName);
    expect(this.response.body.slides.join(',')).to.equal(slidesString);
  },
);
