import { dbConnect } from '@example/connectors';
import { UserModel, AuthModel } from '@example/entities';
import { ApplicationError, errorConfig } from '@example/shared';
import bcrypt from 'bcryptjs';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import jwt from 'jwt-simple';

import UserType from '../../user/UserType';

const userEntity = UserModel(dbConnect);
const authEntity = AuthModel(dbConnect);

const getUserJWT = async (user, password) => {
  if (bcrypt.compareSync(password, user.password)) {
    const id = await authEntity.login(user.id);

    if (id) {
      const payload = {
        id,
        email: user.email,
        active: true,
      };

      const jwtToken = jwt.encode(payload, process.env.JWT_SECRET);
      return jwtToken;
    }
  }

  return null;
};

export const login = async ({ email, password, clientMutationId }) => {
  const user = await userEntity.getUserByEmail(email);

  if (!user) {
    throw new ApplicationError(errorConfig.user.notFound.code);
  }

  const jwtToken = await getUserJWT(user, password);

  if (!jwtToken) {
    throw new ApplicationError(errorConfig.user.notFound.code);
  }

  return { jwtToken, user, clientMutationId };
};

export default mutationWithClientMutationId({
  name: 'LoginMutation',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    jwtToken: { type: GraphQLString },
    user: { type: UserType },
  },
  mutateAndGetPayload: login,
});
