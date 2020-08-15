import { When } from 'cucumber';
import { request } from '../../../../../test/setup.steps';

When(
  /^I register a new account with E\-Mail "([^"]*)" and password "([^"]*)"$/,
  function(email: string, password: string): void {
    this.response = request().post('/register');
  },
);
