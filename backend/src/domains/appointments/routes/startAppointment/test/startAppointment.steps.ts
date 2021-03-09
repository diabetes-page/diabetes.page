import { When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { getAppointment } from '../../../../../test/testingUtilities';

When(
  /^I request to start the appointment for the training "([^"]*)" presented by "([^"]*)"$/,
  async function (trainingName, presenterName) {
    const appointment = await getAppointment(trainingName, presenterName);

    this.response = await testRequest(
      'POST',
      `/appointments/${appointment.id}/start`,
      {},
      this.jwt,
    );
  },
);
