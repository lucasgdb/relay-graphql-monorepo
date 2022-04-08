import type { RequireAtLeastOne, RequiredExceptFor } from '@example/shared';

import type { DBConnector } from '~/database/dbConnector';
import type { IUser } from '~/interfaces';

const UserModel = (dbConnector: DBConnector) => {
  return {
    async insert({ email, ...user }: RequiredExceptFor<IUser, 'id' | 'created_at' | 'updated_at'>) {
      const [newUser] = await dbConnector
        .knexConnection<IUser>('user')
        .insert({ ...user, email: email.toLowerCase() })
        .returning('*');

      return newUser;
    },

    getUserBy(user: RequireAtLeastOne<Omit<IUser, 'email'>>) {
      return dbConnector.knexConnection<IUser>('user').where(user).first();
    },

    getUserByEmail(email: string) {
      return dbConnector.knexConnection<IUser>('user').whereILike('email', `%${email}%`).first();
    },
  };
};

export default UserModel;
