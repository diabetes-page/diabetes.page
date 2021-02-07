import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(/^I request my appointments$/, async function () {
  this.response = await testRequest('GET', '/me/appointments', {}, this.jwt);
});

Then(/^the response contains an array of appoinments$/, async function () {
  expect(this.response.body.appointments).is.a('array');
});

Then(/^the amount of appointments is (\d+)$/, function (appointmentCount) {
  expect(this.response.body.appointments.length).equals(appointmentCount);
});
