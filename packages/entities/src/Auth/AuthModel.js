import moment from 'moment-timezone';
import get from 'lodash/get';

import ConfigModel from '../Config/ConfigModel';
import { callTransactionOrDbConnect } from '../utils';

const AuthModel = dbConnect => {
  const configEntity = ConfigModel(dbConnect);

  return {
    async login(userId) {
      const MAXIMUM_NUMBER_OF_VALID_LOGINS = await configEntity.getConfigByName(
        'maximum_number_of_valid_logins',
      );

      return dbConnect.knexConnection.transaction(async trx => {
        const login = await this.createLogin({ userId }, trx);

        const validLogins = await trx('login')
          .select('id')
          .where('user_id', userId)
          .where('active', true)
          .orderBy('created_at', 'desc')
          .limit(MAXIMUM_NUMBER_OF_VALID_LOGINS);

        const validLoginsId = validLogins.map(validLogin => validLogin.id);

        await trx('login')
          .whereNotIn('id', validLoginsId)
          .andWhere('user_id', userId)
          .andWhere('active', true)
          .update({ active: false, updated_at: moment().format() });

        return get(login, 'id');
      });
    },

    logout(loginId, trx) {
      return callTransactionOrDbConnect('login', dbConnect, trx)
        .update(
          {
            active: false,
            updated_at: moment().format(),
          },
          ['*'],
        )
        .where({ id: loginId })
        .queryContext({ limit: 1 });
    },

    createLogin({ userId, active }, trx) {
      return callTransactionOrDbConnect('login', dbConnect, trx)
        .insert({ user_id: userId, active }, ['*'])
        .queryContext({ limit: 1 });
    },

    getLoginById(loginId, trx) {
      return callTransactionOrDbConnect('login', dbConnect, trx)
        .where({ id: loginId })
        .queryContext({ limit: 1 });
    },
  };
};

export default AuthModel;
