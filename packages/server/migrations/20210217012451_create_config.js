exports.up = async knex => {
  await knex.schema.createTable('config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.string('name').notNullable();
    t.string('value');
    t.boolean('public').defaultTo(true);

    t.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('config');
};
