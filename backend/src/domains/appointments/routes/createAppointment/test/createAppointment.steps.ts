import { expect } from 'chai';
import { Given, TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { Training } from '../../../../trainings/entities/Training.entity';
import { WorkingGroup } from '../../../../workingGroups/entities/WorkingGroup.entity';
import { AppointmentWithWorkingGroupsResource } from '../../../resources/AppointmentWithWorkingGroupsResource';

When(
  /^I create a new appointment with the following data:$/,
  async function (configuration: TableDefinition) {
    const appointmentData = configuration.rowsHash();
    const training = appointmentData.Training
      ? await Training.findOne({ name: appointmentData.Training })
      : null;
    const workingGroup = appointmentData['Working group']
      ? await WorkingGroup.findOne({ name: appointmentData['Working group'] })
      : null;

    this.response = await testRequest(
      'POST',
      `/appointments`,
      {
        startsAt: appointmentData['Start'],
        endsAt: appointmentData['End'],
        trainingId: training?.id ?? null,
        workingGroupId: workingGroup?.id ?? null,
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

Then(
  /^the reason for the rejection is that the start date must be before the end date$/,
  function () {
    expect(this.response.body.message).to.equal(
      'The start of the appointment must be before its end',
    );
  },
);

Then(
  /^the reason for the rejection is that the working group was not supplied$/,
  function () {
    expect(this.response.body.message).to.have.members([
      'workingGroupId must be a string',
      'WorkingGroup was not found',
    ]);
  },
);

Then(
  /^the response contains an appointment with the following attributes:$/,
  async function (attributes: TableDefinition) {
    const expectation = attributes.rowsHash();
    const res: AppointmentWithWorkingGroupsResource = this.response.body;
    expect(res.appointment.training?.name).to.equal(
      expectation.Training || undefined,
    );
    expect(res.appointment.presenter.user.name).to.equal(expectation.Presenter);
    expect(res.appointment.startsAt).to.equal(expectation['Start time']);
    expect(res.appointment.endsAt).to.equal(expectation['End time']);
    expect(res.appointment.isRunning).to.equal(
      expectation['Is running?'] === 'Yes',
    );
    expect(res.workingGroups.map((g) => g.name).join(', ')).to.equal(
      expectation['Working groups'],
    );
  },
);
