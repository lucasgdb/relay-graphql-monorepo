import { errorConfig } from '@example/shared';
import * as bcrypt from 'bcryptjs';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as jwt from 'jwt-simple';

import UserType from '../../user/UserType';
import exampleConnector from '~/database/exampleConnector';
import { UserModel, AuthModel } from '~/entities';
import type { IUser } from '~/interfaces';

const getUserJWToken = async (user: IUser, password: string) => {
  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const authEntity = AuthModel(exampleConnector);

  const loginId = await authEntity.login(user.id!);

  const payload = {
    id: loginId,
    email: user.email,
    active: true,
  };

  const jwtToken = jwt.encode(payload, process.env.JWT_SECRET!);
  return jwtToken;
};

type loginProps = {
  email: string;
  password: string;
  clientMutationId?: string;
};

const login = async ({ email, password, clientMutationId }: loginProps) => {
  const userEntity = UserModel(exampleConnector);

  const user = await userEntity.getUserByEmail(email);
  if (!user) {
    throw new Error(errorConfig.user.notFound.code);
  }

  const jwtToken = await getUserJWToken(user, password);
  if (!jwtToken) {
    throw new Error(errorConfig.user.notFound.code);
  }

  return { jwtToken, user, clientMutationId };
};

const LoginMutation = mutationWithClientMutationId({
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

export default LoginMutation;
