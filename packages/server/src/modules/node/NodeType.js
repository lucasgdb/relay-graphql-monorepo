import { dbConnect } from '@example/connectors';
import { GraphQLObjectType } from 'graphql';
import { fromGlobalId, globalIdField, nodeDefinitions } from 'graphql-relay';

import { getUserOrThrowError } from '../../utils/auth';

const isFunction = object => typeof object === 'function';
const getters = {};
const registeredTypes = {};

const getNode = async (type, id, user, context) => {
  if (isFunction(getters[type])) {
    const obj = await getters[type]({ id, user }, context);
    if (obj) {
      return { ...obj, type };
    }
  }

  return dbConnect
    .getOne({ table: type, params: { id } })
    .then(object => ({ ...object, type }));
};

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);
    const user = await getUserOrThrowError(context);

    if (type) {
      return getNode(type, id, user, context);
    }

    return null;
  },

  object => registeredTypes[object.type] || null,
);

export const registerGraphQLNodeObjectType = (
  table,
  getter = null,
) => config => {
  const type = new GraphQLObjectType({
    ...config,

    fields: () => ({
      id: globalIdField(table),
      ...config.fields(),
    }),

    interfaces: () =>
      config.interfaces
        ? [...config.interfaces, nodeInterface]
        : [nodeInterface],
  });

  registeredTypes[table] = type;
  getters[table] = getter;

  return type;
};

export { nodeInterface };

export default nodeField;
