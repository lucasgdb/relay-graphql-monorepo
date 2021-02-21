/* eslint-disable no-console */
import knexMigrate from 'knex-migrate';

const log = ({ migration }) => console.log(`↑ ${migration}`);

const knexMigration = async () => {
  await knexMigrate('up', {}, log);
  console.info('All migrations are up to date.');
};

export default knexMigration;
