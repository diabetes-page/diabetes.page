import { When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { User } from '../../../../users/entities/User.entity';

When(
  /^I request the appointments of the participant "([^"]*)"$/,
  async function (name) {
    const user = await User.findOne({ name });
    this.response = await testRequest(
      'GET',
      `/users/${user!.id}/appointments`,
      {},
      this.jwt,
    );
  },
);
