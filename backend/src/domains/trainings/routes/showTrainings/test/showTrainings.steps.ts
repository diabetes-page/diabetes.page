import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(/^I request for my trainings$/, async function () {
  this.response = await testRequest('GET', '/trainings', {}, this.jwt);
});
Then(/^the response contains an array of trainings$/, function () {
  expect(this.response.body.trainings).to.be.an('array');
  expect(this.response.body.trainings[0])
    .to.have.property('name')
    .to.equal('Turing Machines by Jesse Pinkman');
  // expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff"); // this is a little more complex, but still really clear
});
