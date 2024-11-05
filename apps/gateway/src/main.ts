import Fastify from 'fastify';
import { app } from './app/app.js';
import crypto from 'node:crypto';
import {
  AxonApplication,
  ClientIdentification,
  configLogger,
  credentials,
} from '@ebd-connect/cqrs-framework';
import * as process from 'node:process';
import { automationProcessors, commandHandlers, queryHandlers, queryProjectors, queryDatabaseModels } from './registered-handlers';

const env = {
  PORT: 3100,
  HOST: 'localhost',
  AXON_HOST: 'localhost:8124',
  CLIENT_NAME: 'mmc-client-gateway',
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_USER: 'postgres',
  DB_PASSWORD: 'postgrespassword',
  DB_NAME: 'mmc',
  DB_LOGGING: false,
};

const host = process.env.HOST ?? 'localhost';
const isProduction = process.env.IS_PRODUCTION ?? false;
const port = process.env.PORT ? Number(process.env.PORT) : 3100;
configLogger();

const axonConnector = new AxonApplication({
  commandHandlers,
  processors: automationProcessors,
  queryProjectors,
  queryHandlers,
  connection: {
    serviceClientInit: {
      address: env.AXON_HOST,
      credentials: credentials.createInsecure(),
    },
    clientIdentification: new ClientIdentification()
      .setComponentName('mmc-gateway')
      .setClientId(isProduction ? crypto.randomUUID() : 'local'),
    forceStayOnSameConnection: !isProduction,
  },
  database: {
    postgres: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      logging: env.DB_LOGGING,
    },
    models: queryDatabaseModels
  },
});
axonConnector
  .connect()
  .then(() => {
    const server = Fastify({
      logger: false
    });
    server.register(app);
    server.listen({ port, host }, (err) => {
      if (err) {
        server.log.error(err);
        console.log('error:',err.message)
        process.exit(1);
      } else {
        console.log(`[ ready ] http://${host}:${port}`);
      }
    });
  })
  .catch((error) => console.error(error.message));
