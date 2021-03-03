import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import { TeachingBase } from '../domains/teachingBases/entities/TeachingBase.entity';
import { TeachingBaseDocument } from '../domains/teachingBases/entities/TeachingBaseDocument.entity';
import { Topic } from '../domains/teachingBases/entities/Topic.entity';
import { Training } from '../domains/trainings/entities/Training.entity';
import { User } from '../domains/users/entities/User.entity';
import { WorkingGroup } from '../domains/workingGroups/entities/WorkingGroup.entity';
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
  /^there is a user with name "([^"]*)" and E-Mail "([^"]*)"$/,
  async function (name, email) {
    await seeder.userFactory.createUser({
      name,
      email,
    });
  },
);

Given(
  /^I am a user with name "([^"]*)", E-Mail "([^"]*)" and password "([^"]*)"$/,
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

Given(/^there is a teaching base called "([^"]*)"$/, async function (name) {
  await seeder.teachingBaseFactory.createTeachingBase({ name });
});

Given(
  /^the teaching base "([^"]*)" has a topic "([^"]*)"$/,
  async function (teachingBaseName, topicName) {
    await seeder.teachingBaseFactory.createTopic(
      (await TeachingBase.findOne({ name: teachingBaseName }))!,
      {
        name: topicName,
      },
    );
  },
);
Given(
  /^the teaching base "([^"]*)" has a document named "([^"]*)"$/,
  async function (teachingBaseName, documentName) {
    await seeder.teachingBaseFactory.createDocument(
      (await TeachingBase.findOne({ name: teachingBaseName }))!,
      {
        name: documentName,
      },
    );
  },
);

Given(
  /^the topic "([^"]*)" has a training "([^"]*)" created by "([^"]*)" based on the document "([^"]*)"$/,
  async function (topicName, trainingName, creatorName, documentName) {
    await seeder.trainingFactory.createTraining(
      (await Topic.findOne({ name: topicName }))!,
      (await TeachingBaseDocument.findOne({ name: documentName }))!,
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
  /^the appointment presented by "([^"]*)" is assigned to the working group "([^"]*)"$/,
  async function (presenterName, workingGroupName) {
    const appointments = await (await (await User.findOne({
      name: presenterName,
    }))!.loadAsConsultant())!.loadAppointments();
    expect(appointments).to.have.length(1);

    const workingGroup = (await WorkingGroup.findOne({
      name: workingGroupName,
    }))!;

    workingGroup.appointments = [
      ...(await workingGroup.loadAppointments()),
      appointments[0],
    ];
    await workingGroup.save();
  },
);

Given(/^the user "([^"]*)" is a consultant$/, async function (name) {
  await seeder.userFactory.createConsultantForUser(
    (await User.findOne({ name }))!,
  );
});

Given(
  /^there is a working group "([^"]*)" with description "([^"]*)" created by "([^"]*)"$/,
  async function (name, description, creatorName) {
    await seeder.workingGroupFactory.createWorkingGroup(
      (await (await User.findOne({ name: creatorName }))!.loadAsConsultant())!,
      {
        name,
        description,
      },
    );
  },
);

Given(
  /^the user "([^"]*)" is in the working group "([^"]*)"$/,
  async function (userName, groupName) {
    const user = (await User.findOne({ name: userName }))!;
    const workingGroup = (await WorkingGroup.findOne({ name: groupName }))!;

    user.workingGroups = [...(await user.loadWorkingGroups()), workingGroup];
    await user.save();
  },
);
Then(/^the request is successful and resource created$/, function() {
  expect(this.response.status).to.equal(HttpStatus.CREATED)
});
