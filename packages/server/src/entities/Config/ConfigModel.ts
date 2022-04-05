import type { DBConnector } from '~/database/dbConnector';
import type { IConfig } from '~/interfaces';

const ConfigModel = (dbConnector: DBConnector) => {
  return {
    getConfigByName(name: string) {
      return dbConnector.knexConnection<IConfig>('config').where('name', name).first();
    },
  };
};

export default ConfigModel;
