import { GraphQLObjectType } from 'graphql';

import type IContext from '~/interfaces/IContext';
import { authField } from './auth/AuthType';
import { nodeField, nodesField } from './node/NodeType';
import { viewerField } from './user/UserType';

const QueryType = new GraphQLObjectType<any, IContext>({
  name: 'Query',
  fields: {
    auth: authField,
    node: nodeField,
    nodes: nodesField,
    viewer: viewerField,
  },
});

export default QueryType;
