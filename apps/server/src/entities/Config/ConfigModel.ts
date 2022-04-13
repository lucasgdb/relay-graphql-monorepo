import type { RequireAtLeastOne } from '@example/shared';

import type { DBConnector } from '~/database/dbConnector';
import type { IConfig } from '~/interfaces';

const ConfigModel = (dbConnector: DBConnector) => {
  return {
    getConfigBy(config: RequireAtLeastOne<IConfig>) {
      return dbConnector.knexConnection<IConfig>('config').where(config).first();
    },
  };
};

export default ConfigModel;
