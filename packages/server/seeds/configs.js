exports.seed = async knex => {
  await knex('config').del();

  await knex('config').insert([
    { id: 1, name: 'maximum_number_of_valid_logins', value: '2', public: true },
  ]);
};
