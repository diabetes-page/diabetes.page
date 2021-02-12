import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import { LearningBase } from '../domains/learningBases/entities/LearningBase.entity';
import { Topic } from '../domains/learningBases/entities/Topic.entity';
import { Training } from '../domains/trainings/entities/Training.entity';
import { User } from '../domains/users/entities/User.entity';
import { seeder, testRequest } from './setup.steps';

Then(/^the request is rejected$/, function () {
  expect(this.response.status).to.equal(HttpStatus.BAD_REQUEST);
});

Then(/^the request is successful$/, function () {
  expect(this.response.status).to.equal(HttpStatus.OK);
});

Then(/^the request is unauthenticated$/, function () {
  // Weirdly, HTTP 401 is called "Unauthorized" when it should be called "Unauthenticated", see
  // https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
  expect(this.response.status).to.equal(HttpStatus.UNAUTHORIZED);
});

Then(/^the request is unauthorized$/, function () {
  expect(this.response.status).to.equal(HttpStatus.FORBIDDEN);
});

Given(
  /^there is a user with name "([^"]*)" and E\-Mail "([^"]*)"$/,
  async function (name, email) {
    await seeder.userFactory.createUser({
      name,
      email,
    });
  },
);

Given(
  /^I am a user with name "([^"]*)", E\-Mail "([^"]*)" and password "([^"]*)"$/,
  async function (name, email, password) {
    this.user = await seeder.userFactory.createUser(
      {
        name,
        email,
      },
      password,
    );
    this.password = password;
  },
);

Given(/^I am logged in$/, async function () {
  const response = await testRequest('POST', '/auth/login', {
    email: this.user.email,
    password: this.password,
  });
  expect(response.status).to.equal(HttpStatus.OK);
  this.jwt = response.body.token;
});

Given(/^there is a learning base called "([^"]*)"$/, async function (name) {
  await seeder.learningBaseFactory.createLearningBase({ name });
});

Given(
  /^the learning base "([^"]*)" has a topic "([^"]*)"$/,
  async function (learningBaseName, topicName) {
    await seeder.learningBaseFactory.createTopic(
      (await LearningBase.findOne({ name: learningBaseName }))!,
      {
        name: topicName,
      },
    );
  },
);

Given(
  /^the topic "([^"]*)" has a training "([^"]*)" created by "([^"]*)"$/,
  async function (topicName, trainingName, creatorName) {
    await seeder.trainingFactory.createTraining(
      (await Topic.findOne({ name: topicName }))!,
      (await (await User.findOne({ name: creatorName }))!.loadAsConsultant())!,
      {
        name: trainingName,
      },
    );
  },
);

Given(
  /^the training "([^"]*)" has an appointment with presenter "([^"]*)"$/,
  async function (trainingName, presenterName) {
    await seeder.appointmentFactory.createAppointment(
      (await Training.findOne({ name: trainingName }))!,
      (await (await User.findOne({
        name: presenterName,
      }))!.loadAsConsultant())!,
    );
  },
);

Given(
  /^the appointment presented by "([^"]*)" is assigned to "([^"]*)"$/,
  async function (presenterName, userName) {
    const appointments = await (await (await User.findOne({
      name: presenterName,
    }))!.loadAsConsultant())!.loadAppointments();
    expect(appointments).to.have.length(1);

    await seeder.appointmentFactory.createUserAppointmentAssignment(
      (await User.findOne({ name: userName }))!,
      appointments[0]!,
    );
  },
);

Given(/^the user "([^"]*)" is a consultant$/, async function (name) {
  await seeder.userFactory.createConsultantForUser(
    (await User.findOne({ name }))!,
  );
});
