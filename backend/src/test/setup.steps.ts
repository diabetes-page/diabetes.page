import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { findEnvOrFail } from '../config/utilities/findEnvOrFail';
import { bootstrap } from '../bootstrap/bootstrap';
import { Before, BeforeAll } from 'cucumber';
import * as supertestRequest from 'supertest';
import supertest = require('supertest');

export let app: INestApplication, server: any, connection: Connection;

export const request = (): supertest.SuperTest<supertest.Test> => {
  return supertestRequest(server);
};

const setEnv = (): void => {
  process.env.DB_DATABASE_NAME = findEnvOrFail('TEST_DB_DATABASE_NAME');
  process.env.DB_USER = findEnvOrFail('TEST_DB_USER');
  process.env.DB_PASSWORD = findEnvOrFail('TEST_DB_PASSWORD');
};

const createApp = async (): Promise<INestApplication> => {
  const app = await bootstrap({ logger: ['error', 'warn'] }, true);
  await app.init();

  return app;
};

BeforeAll(async function() {
  setEnv();

  app = await createApp();
  server = app.getHttpServer();
  connection = app.get(Connection);
});

Before(async function migrateFresh(): Promise<void> {
  await connection.dropDatabase();
  await connection.runMigrations();
});
