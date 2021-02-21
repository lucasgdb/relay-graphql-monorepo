export const callTransactionOrDbConnect = (tableName, dbConnect, trx) =>
  trx ? trx(tableName) : dbConnect.knexConnection(tableName);
