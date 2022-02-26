import Router from '@koa/router';

import { healthCheckerGet } from './controllers/healthCheckerController';

const router = new Router();

const apiServer = () => {
  router.get('/hc', healthCheckerGet);

  return router;
};

export default apiServer;
