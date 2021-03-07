export const callTransactionOrDbConnect = (tableName, dbConnect, trx) => {
  if (trx) {
    return trx(tableName);
  }

  return dbConnect.knexConnection(tableName);
};
