import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import type IContext from '~/interfaces/IContext';
import UserType from '../user/UserType';

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    isLogged: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    user: {
      type: UserType,
    },
  },
});

const getAuth = (_root: unknown, _args: unknown, context: IContext) => {
  if (!context.user?.id) {
    return { isLogged: false, user: null };
  }

  return {
    isLogged: true,
    user: context.user,
  };
};

export const authField = {
  type: new GraphQLNonNull(AuthType),
  resolve: getAuth,
};

export default AuthType;
