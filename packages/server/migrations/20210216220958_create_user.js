exports.up = async knex => {
  await knex.schema.createTable('user', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.string('email')
      .notNullable()
      .unique();

    t.string('password').notNullable();

    t.string('name').notNullable();
    t.string('lastname');

    t.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('user');
};
