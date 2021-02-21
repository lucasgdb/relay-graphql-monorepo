import { GraphQLObjectType } from 'graphql';

import AuthType from './auth/AuthType';
import NodeType from './node/NodeType';
import ViewerType from './viewer/ViewerType';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    auth: AuthType,
    node: NodeType,
    viewer: ViewerType,
  },
});
