import type { Express } from 'express';

import { healthCheckerGet } from './controllers/healthCheckerController';

const apiServer = (server: Express) => {
  server.get('/hc', healthCheckerGet);
};

export default apiServer;
