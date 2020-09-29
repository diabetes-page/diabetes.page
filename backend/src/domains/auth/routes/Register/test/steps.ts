import { When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(
  /^I register a new account with E\-Mail "([^"]*)" and password "([^"]*)"$/,
  async function(email: string, password: string) {
    this.response = await testRequest('POST', '/register');
  },
);
