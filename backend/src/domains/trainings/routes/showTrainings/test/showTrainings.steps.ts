import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(/^I request for my trainings$/, async function () {
  this.response = await testRequest('GET', '/trainings', {}, this.jwt);
});

Then(
  /^the response contains the trainings in the following order:$/,
  async function (configuration: TableDefinition) {
    const expectedTrainings = configuration.hashes();
    const trainings = this.response.body.trainings;
    expect(trainings).to.have.length(expectedTrainings.length);
    expectedTrainings.forEach((expectedTraining, index) => {
      expect(trainings[index].name).to.equal(expectedTraining.name);
    });
  },
);
