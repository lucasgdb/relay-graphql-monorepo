import { GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import connectionFields from '../../utils/connectionFields';
import { registerGraphQLNodeObjectType } from '../node/NodeType';

const UserType = registerGraphQLNodeObjectType('user')({
  name: 'User',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    lastname: {
      type: GraphQLString,
      resolve: user => user.lastname,
    },
    fullname: {
      type: GraphQLString,
      resolve: user =>
        `${user.name}${user.lastname ? ` ${user.lastname}` : ''}`,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
  }),
});

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
  connectionFields,
});

export default UserType;
