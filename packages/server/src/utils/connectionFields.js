import { GraphQLInt } from 'graphql';

export default {
  count: {
    type: GraphQLInt,
    resolve: object => object.count,
  },
};
