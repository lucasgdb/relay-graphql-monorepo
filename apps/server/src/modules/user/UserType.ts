import { GraphQLNonNull, GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import type { IContext, IUser } from '~/interfaces';
import getUserOrThrowError from '~/utils/getUserOrThrowError';
import { registerGraphQLNodeObjectType } from '../node/NodeType';

const UserType = registerGraphQLNodeObjectType<IUser>('user')({
  name: 'User',
  fields() {
    return {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastname: {
        type: new GraphQLNonNull(GraphQLString),
      },
      fullname: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(user) {
          return `${user.name}${user.lastname ? ` ${user.lastname}` : ''}`;
        },
      },
    };
  },
});

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

export const viewerField = {
  type: new GraphQLNonNull(UserType),
  resolve(_root: IUser | undefined, _args: unknown, context: IContext) {
    return getUserOrThrowError(context);
  },
};

export default UserType;
