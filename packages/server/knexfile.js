const defaultConfigs = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: 'schema_version',
  },
};

module.exports = {
  DEVELOPMENT: {
    ...defaultConfigs,
  },
  HOMOLOG: {
    ...defaultConfigs,
  },
  PRODUCTION: {
    ...defaultConfigs,
  },
};
