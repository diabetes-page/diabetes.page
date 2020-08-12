import { binding, when } from 'cucumber-tsflow';
import { after, before } from 'cucumber-tsflow/dist';
import * as request from 'supertest';
import supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../../../../bootstrap/bootstrap';

@binding()
export class Steps {
  private server: any;
  private app: INestApplication;

  @before()
  public async beforeEachScenario(): Promise<void> {
    this.app = await bootstrap();
    await this.app.init();
    this.server = this.app.getHttpServer();
  }

  @after()
  public async afterEachScenario(): Promise<void> {
    await this.app.close();
  }

  @when(/I register a new account with E-Mail "([^"]*)" and password "([^"]*)"/)
  public registerNewAccount(email: string, password: string): supertest.Test {
    console.log(process.env.NODE_ENV);
    return request(this.server)
      .post('/register')
      .expect(200);
  }
}
