export { default as environment } from './Environment';
export { offsetToCursor } from './helpers';
export {
  connectionDeleteEdgeUpdater,
  connectionUpdater,
} from './mutationUtils';

export const CONNECTION_VARIABLES = { first: 10, filtered: [], sorted: [] };
