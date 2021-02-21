import { callTransactionOrDbConnect } from '../utils';

const AuthModel = dbConnect => ({
  createUser({ name, lastname, email, password }, trx) {
    return callTransactionOrDbConnect('user', dbConnect, trx)
      .insert(
        {
          name,
          lastname,
          email: email.toLowerCase(),
          password,
        },
        ['*'],
      )
      .queryContext({ limit: 1 });
  },

  getUserByEmail(email, trx) {
    return callTransactionOrDbConnect('user', dbConnect, trx)
      .whereRaw('UPPER("user"."email") = ?', email.toUpperCase())
      .queryContext({ limit: 1 });
  },

  getUserById(userId, trx) {
    return callTransactionOrDbConnect('user', dbConnect, trx)
      .where({ id: userId })
      .queryContext({ limit: 1 });
  },
});

export default AuthModel;
