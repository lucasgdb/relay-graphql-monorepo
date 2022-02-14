import type { Request, Response } from 'express';

import exampleConnector from '~/database/exampleConnector';

export const healthCheckerGet = async (_req: Request, res: Response) => {
  if (await exampleConnector.checkConnection()) {
    return res.status(200).send('OK');
  }

  return res.status(404).send('DB out of service!');
};
