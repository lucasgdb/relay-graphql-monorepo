import get from 'lodash/get';

import { callTransactionOrDbConnect } from '../utils';

const AuthModel = dbConnect => ({
  async getConfigByName(name, trx) {
    const config = await callTransactionOrDbConnect('config', dbConnect, trx)
      .where({ name })
      .queryContext({ limit: 1 });

    return get(config, 'value') || 2;
  },
});

export default AuthModel;
