import { dbConnect } from '@example/connectors';
import { UserModel, AuthModel } from '@example/entities';
import { errorConfig, ApplicationError } from '@example/shared';
import bcrypt from 'bcryptjs';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import jwt from 'jwt-simple';

import UserType from '../UserType';

const userEntity = UserModel(dbConnect);
const authEntity = AuthModel(dbConnect);

const getUserJWT = async (user, password) => {
  if (bcrypt.compareSync(password, user.password)) {
    const login = await authEntity.CreateUser({ userId: user.id });

    if (login.id) {
      const payload = {
        id: login.id,
        email: user.email,
        active: true,
      };

      const jwtToken = jwt.encode(payload, process.env.JWT_SECRET);
      return jwtToken;
    }
  }

  return null;
};

export const createUser = async ({
  name,
  lastname,
  email,
  password,
  clientMutationId,
}) => {
  const user = await userEntity.getUserByEmail(email);

  if (user) {
    throw new ApplicationError(errorConfig.user.duplicatedEmail.code);
  }

  const encrypted = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const newUser = await userEntity.createUser({
    name,
    lastname,
    email,
    password: encrypted,
  });

  const jwtToken = await getUserJWT(newUser, password);

  return {
    jwtToken,
    user,
    clientMutationId,
  };
};

export default mutationWithClientMutationId({
  name: 'CreateUserMutation',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    jwtToken: { type: GraphQLString },
    user: { type: UserType },
  },
  mutateAndGetPayload: createUser,
});
