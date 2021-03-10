import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { flatten } from 'lodash';
import { testRequest } from '../../../../../test/setup.steps';
import { User } from '../../../../users/entities/User.entity';

When(
  /^I request the appointments of the participant "([^"]*)"$/,
  async function (name) {
    const user = await User.findOne({ name });
    this.response = await testRequest(
      'GET',
      `/users/${user!.id}/appointments`,
      {},
      this.jwt,
    );
  },
);

Then(/^the response contains an array of appointments$/, async function () {
  expect(this.response.body.appointments).is.a('array');
});

Then(/^the amount of appointments is (\d+)$/, function (appointmentCount) {
  expect(this.response.body.appointments.length).equals(appointmentCount);
});

Then(
  /^the appointment at index (\d+) has presenter "([^"]*)"$/,
  function (index, name) {
    expect(
      this.response.body.appointments[index].appointment.presenter.user.name,
    ).equals(name);
  },
);

Then(
  /^the appointment at index (\d+) has training "([^"]*)"$/,
  function (index, name) {
    expect(
      this.response.body.appointments[index].appointment.training.name,
    ).equals(name);
  },
);

Then(
  /^the appointment at index (\d+) is assigned through the following working groups:$/,
  function (index, configuration: TableDefinition) {
    const groupNames = flatten(configuration.raw());
    expect(
      this.response.body.appointments[index].workingGroups.map(
        (group: any) => group.name,
      ),
    ).to.deep.equal(groupNames);
  },
);
