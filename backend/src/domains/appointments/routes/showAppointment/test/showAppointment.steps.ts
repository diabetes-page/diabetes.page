import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/testingUtilities';

When(
  /^I request the appointment for the training "([^"]*)" presented by "([^"]*)"$/,
  async function (trainingName, presenterName) {
    const appointment = await getAppointment(trainingName, presenterName);

    this.response = await testRequest(
      'GET',
      `/appointments/${appointment.id}`,
      {},
      this.jwt,
    );
  },
);

Then(
  /^the response contains an appointment with the following attributes:$/,
  async function (attributes: TableDefinition) {
    const expectation = attributes.rowsHash();
    expect(this.response.body.training.name).to.equal(expectation.Training);
    expect(this.response.body.presenter.user.name).to.equal(
      expectation.Presenter,
    );
    expect(this.response.body.startsAt).to.equal(expectation['Start time']);
    expect(this.response.body.endsAt).to.equal(expectation['End time']);
    expect(this.response.body.isRunning).to.equal(
      expectation['Is running?'] === 'Yes',
    );
  },
);
