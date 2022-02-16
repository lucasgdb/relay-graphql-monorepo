import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'dayjs/locale/pt-br';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.locale('pt-br');
dayjs.extend(localeData);

import { graphqlHTTP } from 'express-graphql';
import { printSchema } from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import type { Request, Response, NextFunction } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import compression from 'compression';

import schema from './modules/schema';
import auth from './utils/auth';
import apiServer from './apiServer';

const { NODE_ENV, GRAPHQL_PORT, GRAPHQL_BASE_URL } = process.env;

const isDevelopmentMode = NODE_ENV?.toUpperCase() === 'DEVELOPMENT';

const graphQLServer = express();
const jwtAuth = auth();

const corsConfig = {
  methods: 'GET,POST',
  preflightContinue: false,
  credentials: true,
};

graphQLServer.use(compression());

graphQLServer.use(cors(corsConfig));
graphQLServer.use(json({ limit: '10mb' }));
graphQLServer.use(urlencoded({ extended: true }));

apiServer(graphQLServer);

const addRequestStart = (req: Request, _res: Response, next: NextFunction) => {
  req.start = Date.now();
  return next();
};

graphQLServer.use(
  '/graphql',
  jwtAuth.initialize(),
  jwtAuth.authenticate(),
  addRequestStart,
  graphqlHTTP((request: unknown) => ({
    schema,
    context: {
      user: (request as Request).user,
      loginId: (request as Request).loginId,
    },
    customFormatErrorFn: (error) => {
      console.error(
        `ERROR[${dayjs().format('HH:mm:ss DD/MM/YYYY')}][${
          error.path ? error.path.join(' -> ') : ''
        }] ===> ${error.message}`
      );

      return error;
    },
    extensions: ({ document }) => {
      // @ts-expect-error document with wrong type
      document.definitions.forEach(({ name }) => {
        if (name) {
          const start = (request as Request).start!;

          console.info(
            `[${dayjs().format('HH:mm:ss DD/MM/YYYY')}] - ${name.value} = ${
              Date.now() - start
            }`
          );
        }
      });

      return {};
    },
  }))
);

if (isDevelopmentMode) {
  graphQLServer.all('/playground', expressPlayground({ endpoint: '/graphql' }));
}

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.info(`GraphQL Server is now running on ${GRAPHQL_BASE_URL}`);

  const graphQLFile = path.resolve(__dirname, '../schema.graphql');
  const schemaString = printSchema(schema);

  fs.writeFileSync(graphQLFile, schemaString);
});
