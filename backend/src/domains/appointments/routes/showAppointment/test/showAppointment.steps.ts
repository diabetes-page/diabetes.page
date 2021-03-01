import { expect } from 'chai';
import { Given, TableDefinition, Then, When } from 'cucumber';
import { parseISO } from 'date-fns';
import { seeder, testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/testingUtilities';
import { Training } from '../../../../trainings/entities/Training.entity';
import { User } from '../../../../users/entities/User.entity';
import { WorkingGroup } from '../../../../workingGroups/entities/WorkingGroup.entity';

Given(
  /^the training "([^"]*)" has an appointment with the following configuration:$/,
  async function (trainingName, configuration: TableDefinition) {
    const dataHash = configuration.rowsHash();
    const training = (await Training.findOne({ name: trainingName }))!;
    const presenter = (await (await User.findOne({
      name: dataHash.Presenter,
    }))!.loadAsConsultant())!;

    await seeder.appointmentFactory.createAppointment(training, presenter, {
      startsAt: parseISO(dataHash['Start time']),
      endsAt: parseISO(dataHash['End time']),
    });
  },
);

When(
  /^I request the appointment for the training "([^"]*)" presented by "([^"]*)" in the working group "([^"]*)"$/,
  async function (trainingName, presenterName, workingGroupName) {
    const appointment = await getAppointment(trainingName, presenterName);
    const workingGroup = (await WorkingGroup.findOne({
      name: workingGroupName,
    }))!;

    this.response = await testRequest(
      'GET',
      `/working-groups/${workingGroup.id}/appointments/${appointment.id}`,
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
    expect(this.response.body.workingGroup.name).to.equal(
      expectation['Working group'],
    );
  },
);
