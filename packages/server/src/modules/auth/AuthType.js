import { dbConnect } from '@example/connectors';
import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

import UserType from '../user/UserType';

const getAuth = async (_root, _args, context) => {
  if (!(context.user && context.user.id)) {
    return { isLogged: false, user: null };
  }

  const user = dbConnect.getOne({
    table: 'user',
    params: { id: context.user.id },
  });

  const isLogged = Boolean(user);

  return { isLogged, user };
};

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    isLogged: {
      type: GraphQLBoolean,
      resolve: auth => auth.isLogged,
    },
    user: {
      type: UserType,
      resolve: auth => auth.user,
    },
  },
});

export default {
  type: AuthType,
  resolve: getAuth,
};
