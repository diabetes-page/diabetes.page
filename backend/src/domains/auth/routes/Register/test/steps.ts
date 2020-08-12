import { binding, when } from 'cucumber-tsflow';
import { before } from 'cucumber-tsflow/dist';
import * as request from 'supertest';

@binding()
export class Steps {
  private server: any;

  @before()
  public async beforeAllScenarios(): Promise<void> {
    // const app = await bootstrap();
    // this.server = app.getHttpServer();
  }

  @when(/I register a new account with E-Mail "([^"]*)" and password "([^"]*)"/)
  public registerNewAccount(email: string, password: string): void {
    request(this.server)
      .post('/register')
      .expect(200);
  }
}
