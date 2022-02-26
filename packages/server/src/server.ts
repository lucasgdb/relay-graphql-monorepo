import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'dayjs/locale/pt-br';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.locale('pt-br');
dayjs.extend(localeData);

import { printSchema } from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import type { Context, Next } from 'koa';
import cors from '@koa/cors';
import type { Options as CorsConfig } from '@koa/cors';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';
import { graphqlHTTP } from 'koa-graphql';

import schema from './modules/schema';
import auth from './utils/auth';
import apiServer from './apiServer';

const { NODE_ENV, GRAPHQL_PORT, GRAPHQL_BASE_URL } = process.env;
const isDevelopmentMode = NODE_ENV?.toUpperCase() === 'DEVELOPMENT';

const app = new Koa();

const jwtAuth = auth();

const corsConfig: CorsConfig = {
  allowMethods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(koaCompress());
app.use(koaBody());

const router = apiServer();

const addRequestStartedAt = (ctx: Context, next: Next) => {
  ctx.request.startedAt = Date.now();
  return next();
};

router.use(
  '/graphql',
  jwtAuth.initialize,
  jwtAuth.authenticate,
  addRequestStartedAt
);

router.post(
  '/graphql',
  graphqlHTTP((request) => ({
    schema,
    graphiql: isDevelopmentMode,
    pretty: isDevelopmentMode,
    context: {
      user: request.user,
      loginId: request.loginId,
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
          const start = request.startedAt!;

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

app.use(router.routes()).use(router.allowedMethods());

app.listen(GRAPHQL_PORT, () => {
  console.info(`GraphQL Server is now running. ${GRAPHQL_BASE_URL}`);

  const graphQLFile = path.resolve(__dirname, '../schema.graphql');
  const schemaString = printSchema(schema);

  fs.writeFileSync(graphQLFile, schemaString);
});
