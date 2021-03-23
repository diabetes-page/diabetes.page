import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, TableDefinition, Then } from 'cucumber';
import { parseISO } from 'date-fns';
import { Appointment } from '../domains/appointments/entities/Appointment.entity';
import { AppointmentWithWorkingGroupsResource } from '../domains/appointments/resources/AppointmentWithWorkingGroupsResource';
import { TeachingBase } from '../domains/teachingBases/entities/TeachingBase.entity';
import { TeachingBaseDocument } from '../domains/teachingBases/entities/TeachingBaseDocument.entity';
import { Topic } from '../domains/teachingBases/entities/Topic.entity';
import { Training } from '../domains/trainings/entities/Training.entity';
import { User } from '../domains/users/entities/User.entity';
import { WorkingGroup } from '../domains/workingGroups/entities/WorkingGroup.entity';
import { seeder, testRequest } from './setup.steps';
import { MockMail, mockMailer } from './utilities/MockMailer';
import { compareToTable, getAppointment } from './utilities/testingUtilities';

Then(/^the request is rejected$/, function () {
  expect(this.response.status).to.equal(HttpStatus.BAD_REQUEST);
});

Then(/^the request is successful$/, function () {
  expect(this.response.status).to.equal(HttpStatus.OK);
});

Then(/^the request is successful without response$/, function () {
  expect(this.response.status).to.equal(HttpStatus.NO_CONTENT);
});

Then(/^the request is successful and the resource created$/, function () {
  expect(this.response.status).to.equal(HttpStatus.CREATED);
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
  /^there is a user with name "([^"]*)" and e-mail "([^"]*)"$/,
  async function (name, email) {
    await seeder.userFactory.createUser({
      name,
      email,
    });
  },
);

Given(
  /^I am a user with name "([^"]*)", e-mail "([^"]*)" and password "([^"]*)"$/,
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

Given(
  /^the appointment for the training "([^"]*)" presented by "([^"]*)" is assigned to the working group "([^"]*)"$/,
  async function (trainingName, presenterName, workingGroupName) {
    const appointment = await getAppointment(trainingName, presenterName);
    const workingGroup = (await WorkingGroup.findOne({
      name: workingGroupName,
    }))!;

    workingGroup.appointments = [
      ...(await workingGroup.loadAppointments()),
      appointment,
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

Then(/^the request is successful and resource created$/, function () {
  expect(this.response.status).to.equal(HttpStatus.CREATED);
});

Given(
  /^the training "([^"]*)" uses the following slides: "([^"]*)"$/,
  async function (trainingName, slidesString) {
    const training = (await Training.findOne({ name: trainingName }))!;
    const slides = slidesString
      .split(',')
      .map((s: string) => parseInt(s.trim()));

    await Training.update(training.id, {
      slides: slides,
    });
  },
);

Then(/^the response is empty$/, function () {
  expect(this.response.body).to.deep.equal({});
});

Then(/^the following e-mails were sent:$/, function (table: TableDefinition) {
  compareToTable(
    mockMailer.getSentMails(),
    table,
    (mail: MockMail, expectedMail: Record<string, string>): void => {
      expect(mail.recipient).to.equal(expectedMail.Recipient);
      expect(mail.subject).to.equal(expectedMail.Subject);
      expect(mail.language).to.equal(expectedMail.Language);
    },
  );
});

Then(
  /^e-mail number (\d+) had the following content:$/,
  function (position: number, linesTable: TableDefinition) {
    const expectation = linesTable
      .raw()
      .map((s) => s[0].trim())
      .filter((s) => !!s);
    const mails = mockMailer.getSentMails();

    expect(mails[position - 1].paragraphs).to.deep.equal(expectation);
  },
);

Then(/^no e-mails were sent$/, function () {
  expect(mockMailer.getSentMails()).to.have.length(0);
});

Then(
  /^the response contains the following appointments in order:$/,
  function (table: TableDefinition) {
    compareToTable(
      this.response.body.appointments,
      table,
      (
        { appointment, workingGroups }: AppointmentWithWorkingGroupsResource,
        expectation: Record<string, string>,
      ): void => {
        expect(appointment.presenter.user.name).to.equal(expectation.Presenter);

        expect(appointment.training!.name).to.equal(expectation.Training);

        expect(workingGroups.map((g) => g.name).join(', ')).to.equal(
          expectation['Working groups'],
        );
      },
    );
  },
);

Given(
  /^the appointment for the training "([^"]*)" presented by "([^"]*)" is( not | )running$/,
  async function (trainingName, presenterName, truthString: string) {
    const isRunning = truthString.trim() !== 'not';
    const appointment = await getAppointment(trainingName, presenterName);

    await Appointment.update(appointment.id, {
      isRunning,
    });
  },
);

Then(
  /^the response contains an appointment with the following attributes:$/,
  async function (attributes: TableDefinition) {
    const expectation = attributes.rowsHash();
    expect(this.response.body.training?.name).to.equal(
      expectation.Training || undefined,
    );
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
