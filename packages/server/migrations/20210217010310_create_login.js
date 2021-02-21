exports.up = async knex => {
  await knex.schema.createTable('login', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('user_id').unsigned();
    t.foreign('user_id').references('user.id');

    t.boolean('active').defaultTo(true);

    t.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('login');
};
