import { binding, when } from 'cucumber-tsflow';
import { after, before } from 'cucumber-tsflow/dist';
import * as request from 'supertest';
import supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../../../../bootstrap/bootstrap';
import { Connection } from 'typeorm';
import { findEnvOrFail } from '../../../../../config/utilities/findEnvOrFail';

@binding()
export class Steps {
  private server: any;
  private app: INestApplication;
  private connection: Connection;

  @before()
  public async beforeEachScenario(): Promise<void> {
    this.setEnv();

    this.app = await this.createApp();
    this.server = this.app.getHttpServer();
    this.connection = this.app.get(Connection);

    await this.migrateFresh();
  }

  private setEnv(): void {
    process.env.DB_DATABASE_NAME = findEnvOrFail('TEST_DB_DATABASE_NAME');
    process.env.DB_USER = findEnvOrFail('TEST_DB_USER');
    process.env.DB_PASSWORD = findEnvOrFail('TEST_DB_PASSWORD');
  }

  private async createApp(): Promise<INestApplication> {
    const app = await bootstrap({ logger: ['error', 'warn'] }, true);
    await app.init();

    return app;
  }

  private async migrateFresh(): Promise<void> {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }

  @after()
  public async afterEachScenario(): Promise<void> {
    await this.app.close();
  }

  @when(/I register a new account with E-Mail "([^"]*)" and password "([^"]*)"/)
  public registerNewAccount(email: string, password: string): supertest.Test {
    return request(this.server)
      .post('/register')
      .expect(200);
  }
}
