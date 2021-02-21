/* eslint-disable no-console */
import { ConnectionHandler } from 'relay-runtime';

export function connectionUpdater({
  store,
  parentId,
  connectionName,
  edge,
  before = false,
  connectionArgs = {},
}) {
  if (edge) {
    if (!parentId) {
      console.log('maybe you forgot to pass a parentId: ');
      return;
    }

    const parentProxy = store.get(parentId);

    const conn = ConnectionHandler.getConnection(
      parentProxy,
      connectionName,
      connectionArgs,
    );

    if (!conn) {
      console.log(
        'maybe this connection is not in relay store: ',
        connectionName,
      );
      return;
    }

    if (before) {
      ConnectionHandler.insertEdgeBefore(conn, edge);
    } else {
      ConnectionHandler.insertEdgeAfter(conn, edge);
    }
  }
}

export function connectionDeleteEdgeUpdater({
  parentId,
  connectionName,
  nodeId,
  store,
  connectionArgs = {},
}) {
  const parentProxy = store.get(parentId);
  const conn = ConnectionHandler.getConnection(
    parentProxy,
    connectionName,
    connectionArgs,
  );

  if (!conn) {
    console.warn(`Connection ${connectionName} not found on ${parentId}`);
    return;
  }

  ConnectionHandler.deleteNode(conn, nodeId);
}
