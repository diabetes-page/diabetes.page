import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { seeder, testRequest } from '../../../../../test/setup.steps';

Given(
  /^There is exactly (\d+) appointment assigned to me$/,
  async function (appointmentCount) {
    const learningBase = await seeder.learningBaseFactory.createLearningBase();
    const topic = await seeder.learningBaseFactory.createTopic(learningBase);
    const consultant = await seeder.userFactory.createConsultant();
    const training = await seeder.trainingFactory.createTraining(
      topic,
      consultant,
    );
    const appointment = await seeder.appointmentFactory.createAppointment(
      training,
      consultant,
    );

    await seeder.appointmentFactory.createUserAppointmentAssignment(
      this.user,
      appointment,
    );
  },
);

When(/^I request for my appointments$/, async function () {
  this.response = await testRequest('GET', '/appointments', {}, this.jwt);
});

Then(/^the response contains an array of appoinments$/, async function () {
  expect(this.response.body.appointments).is.a('array');
});

Then(/^the amount of appointments is (\d+)$/, function (appointmentCount) {
  expect(this.response.body.appointments.length).equals(appointmentCount);
});
