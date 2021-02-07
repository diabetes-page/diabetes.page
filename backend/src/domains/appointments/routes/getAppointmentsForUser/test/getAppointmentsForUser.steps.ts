import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(/^I request my appointments$/, async function () {
  this.response = await testRequest('GET', '/me/appointments', {}, this.jwt);
});

Then(/^the response contains an array of appointments$/, async function () {
  expect(this.response.body.appointments).is.a('array');
});

Then(/^the amount of appointments is (\d+)$/, function (appointmentCount) {
  expect(this.response.body.appointments.length).equals(appointmentCount);
});

Then(
  /^the appointment at index (\d+) has presenter "([^"]*)"$/,
  function (index, name) {
    expect(this.response.body.appointments[index].presenter.user.name).equals(
      name,
    );
  },
);

Then(
  /^the appointment at index (\d+) has training "([^"]*)"$/,
  function (index, name) {
    expect(this.response.body.appointments[index].training.name).equals(name);
  },
);
