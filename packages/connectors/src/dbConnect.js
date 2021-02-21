import { convertKeysMiddleware } from '@example/shared';
import assert from 'assert';
import knex from 'knex';
import { head } from 'lodash';

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const createKnexConnection = () =>
  knex({
    client: 'pg',
    connection: connectionConfig,
    pool: { min: 0, max: 50 },
    postProcessResponse: (result, queryContext) => {
      const newResult = result.rows ? result.rows : result;

      if (Array.isArray(newResult)) {
        const newMappedResult = newResult.map(row =>
          convertKeysMiddleware(row),
        );

        if (
          queryContext &&
          (queryContext.limit === 1 || queryContext.limit === '1')
        ) {
          return head(newMappedResult);
        }

        return newMappedResult;
      }

      return convertKeysMiddleware(newResult);
    },
  });

const knexConnection = createKnexConnection();

const checkConnection = async () => {
  try {
    const data = await knexConnection
      .raw('SELECT 1+1 AS check')
      .queryContext({ limit: 1 });

    if (!data) {
      return false;
    }

    assert.strictEqual(data.check, 2);

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('DB out of service!');
  }

  return false;
};

const get = ({ table, params = {} }) => knexConnection(table).where(params);

const getByIds = table => ids => knexConnection(table).whereIn('id', ids);

const getOne = ({ table, params = {} }) =>
  get({ table, params })
    .queryContext({ limit: 1 })
    .limit(1);

const fromCamelToSnakeCase = (name, separator) =>
  name
    .replace(
      /([a-z]|(?:[A-Z0-9]+))([A-Z0-9]|$)/g,
      (_, $1, $2) => $1 + ($2 && (separator || '_') + $2),
    )
    .toLowerCase();

const keysToSnakeCase = obj =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [fromCamelToSnakeCase(key)]: obj[key] }),
    {},
  );

const put = ({ table, params, data }) =>
  knexConnection(table)
    .where(params)
    .update({ json_data: JSON.stringify(data) });

const upsert = ({ table, params }) => {
  const { object, constraint } = params;
  const insert = knexConnection(table).insert(object);
  const update = knexConnection.queryBuilder().update(object);

  return knexConnection.raw(`? ON CONFLICT ${constraint} DO ? returning *`, [
    insert,
    update,
  ]);
};

const disconnect = () => knexConnection.destroy();

export default {
  getByIds,
  checkConnection,
  get,
  getOne,
  put,
  upsert,
  knexConnection,
  fromCamelToSnakeCase,
  keysToSnakeCase,
  disconnect,
};
