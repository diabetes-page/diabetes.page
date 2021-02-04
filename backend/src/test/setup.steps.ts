import { Before, BeforeAll } from 'cucumber';
import * as https from 'https';
import { Connection } from 'typeorm';
import { bootstrap } from '../bootstrap/bootstrap';
import { findEnvOrFail } from '../config/utilities/findEnvOrFail';
import superagent = require('superagent');

let server: any, connection: Connection;

const getFullPath = (path: string): string => {
  const port = server.address().port;
  const protocol = server instanceof https.Server ? 'https' : 'http';

  return protocol + '://127.0.0.1:' + port + path;
};

export const testRequest = async (
  method: string,
  path: string,
  data?: string | Record<string, unknown>,
): Promise<superagent.Response> => {
  return new Promise((resolve) => {
    superagent(method, getFullPath(path))
      .send(data)
      .end((err: any, response: superagent.Response) => resolve(response));
  });
};

const setEnv = (): void => {
  process.env.TYPEORM_USERNAME = findEnvOrFail('TEST_TYPEORM_USERNAME');
  process.env.TYPEORM_PASSWORD = findEnvOrFail('TEST_TYPEORM_PASSWORD');
  process.env.TYPEORM_DATABASE = findEnvOrFail('TEST_TYPEORM_DATABASE');
};

BeforeAll(async function () {
  setEnv();

  const app = await bootstrap(true);
  server = app.getHttpServer();
  connection = app.get(Connection);
});

Before(async function migrateFresh(): Promise<void> {
  await connection.dropDatabase();
  await connection.runMigrations();
});
