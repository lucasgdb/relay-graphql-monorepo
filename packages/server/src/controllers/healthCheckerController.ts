import type { RouterContext } from '@koa/router';

import exampleConnector from '~/database/exampleConnector';

export const healthCheckerGet = async (ctx: RouterContext) => {
  const hasConnection = await exampleConnector.checkConnection();
  if (hasConnection) {
    ctx.status = 200;
    ctx.body = 'OK';

    return;
  }

  ctx.status = 400;
  ctx.body = 'DB out of service!';
};
