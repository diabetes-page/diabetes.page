import { When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/utilities/testingUtilities';

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
