import { INestApplication } from '@nestjs/common';
import { AfterAll, Before, BeforeAll } from 'cucumber';
import * as https from 'https';
import { Connection } from 'typeorm';
import { bootstrap } from '../bootstrap/bootstrap';
import { findEnvOrFail } from '../config/utilities/findEnvOrFail';
import { MainSeeder } from '../database/seeding/MainSeeder';
import { MockMailer } from './utilities/MockMailer';
import superagent = require('superagent');

let app: INestApplication, server: any, connection: Connection;
export let seeder: MainSeeder;
export const mockMailer = new MockMailer();

const getFullPath = (path: string): string => {
  const port = server.address().port;
  const protocol = server instanceof https.Server ? 'https' : 'http';

  return protocol + '://127.0.0.1:' + port + path;
};

export const testRequest = async (
  method: string,
  path: string,
  data?: Record<string, unknown>,
  jwt?: string,
): Promise<superagent.Response> => {
  return new Promise((resolve) => {
    let agent = superagent(method, getFullPath(path));

    if (jwt) {
      agent = agent.auth(jwt, { type: 'bearer' });
    }

    agent
      .send(data)
      .end((err: any, response: superagent.Response) => resolve(response));
  });
};

const setEnv = (): void => {
  process.env.NODE_ENV = 'testing';
  process.env.TYPEORM_USERNAME = findEnvOrFail('TEST_TYPEORM_USERNAME');
  process.env.TYPEORM_PASSWORD = findEnvOrFail('TEST_TYPEORM_PASSWORD');
  process.env.TYPEORM_DATABASE = findEnvOrFail('TEST_TYPEORM_DATABASE');
};

BeforeAll(async function () {
  setEnv();

  app = await bootstrap(true);
  server = app.getHttpServer();
  connection = app.get(Connection);
  seeder = app.get(MainSeeder);
});

Before(async function migrateFresh(): Promise<void> {
  await connection.dropDatabase();
  await connection.runMigrations();
  mockMailer.reset();
});

AfterAll(async function () {
  await app.close();
});
