import { fromGlobalId } from 'graphql-relay';

export const fromGlobalIDtoID = globalID =>
  parseInt(fromGlobalId(globalID).id, 10);
