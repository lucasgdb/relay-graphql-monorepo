/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { dbConnect } from '@example/connectors';
import { graphqlHTTP } from 'express-graphql';
import { printSchema } from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import moment from 'moment-timezone';
import compression from 'compression';

import schema from './modules/schema';
import auth from './utils/auth';
import transformErrorToGraphQLError from './utils/transformErrorToGraphQLError';
import apiServer from './apiServer';
import knexMigration from './utils/scripts/knexMigration';

const { NODE_ENV, GRAPHQL_PORT, GRAPHQL_BASE_URL } = process.env;
const isDevelopmentMode = NODE_ENV.toUpperCase() === 'DEVELOPMENT';
const graphQLServer = express();
const jwtAuth = auth();

if (isDevelopmentMode) {
  knexMigration();
}

const corsConfig = {
  methods: 'GET,POST',
  preflightContinue: false,
  credentials: true,
};

const extensions = request => ({ document }) => {
  document.definitions.forEach(({ name }) => {
    if (name) {
      console.info(
        `[${moment().format('HH:mm:ss DD/MM/YYYY')}] - ${
          name.value
        } = ${Date.now() - request.start}`,
      );
    }
  });

  return {};
};

const printError = error =>
  console.error(
    `ERROR[${moment().format('HH:mm:ss DD/MM/YYYY')}][${
      error.path ? error.path.join(' -> ') : ''
    }] ===> ${error.message}`,
  );

graphQLServer.use(compression());

graphQLServer.get('/hc', async (_req, res) => {
  if (await dbConnect.checkConnection()) {
    return res.status(200).send('OK');
  }

  return res.status(404).send('DB out of service!');
});

graphQLServer.use((req, _res, next) => {
  req.start = Date.now();
  return next();
});

graphQLServer.use(cors(corsConfig));
graphQLServer.use(express.json({ limit: '10mb' }));
graphQLServer.use(express.urlencoded({ extended: true }));
graphQLServer.use(jwtAuth.initialize());

apiServer(graphQLServer);

graphQLServer.all('/graphql*', jwtAuth.authenticate());

graphQLServer.use(
  '/graphql',
  graphqlHTTP(request => ({
    schema,
    pretty: isDevelopmentMode,
    customFormatErrorFn: error => {
      printError(error);
      return transformErrorToGraphQLError(error, error.originalError);
    },
    extensions: extensions(request),
    context: {
      user: request.user,
      login: request.login,
    },
  })),
);

if (isDevelopmentMode) {
  graphQLServer.all('/playground', expressPlayground({ endpoint: '/graphql' }));
}

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on ${GRAPHQL_BASE_URL}`);

  const graphQLFile = path.join(__dirname, '../schema.graphql');
  const schemaString = printSchema(schema, { commentDescriptions: true });

  fs.writeFileSync(graphQLFile, schemaString);
});
