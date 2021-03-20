import { When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { User } from '../../../../users/entities/User.entity';

When(
  /^I request the appointments of the consultant "([^"]*)"$/,
  async function (name) {
    const user = await User.findOne({ name });
    const consultant = await user?.loadAsConsultant();

    this.response = await testRequest(
      'GET',
      `/consultants/${consultant!.id}/appointments`,
      {},
      this.jwt,
    );
  },
);
