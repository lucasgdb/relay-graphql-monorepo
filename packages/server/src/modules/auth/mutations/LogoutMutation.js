import { AuthModel } from '@example/entities';
import { dbConnect } from '@example/connectors';
import { mutationWithClientMutationId } from 'graphql-relay';

const authEntity = AuthModel(dbConnect);

const logout = async ({ clientMutationId }, context) => {
  await authEntity.logout(context.login.id);

  return { clientMutationId };
};

export default mutationWithClientMutationId({
  name: 'LogoutMutation',
  mutateAndGetPayload: logout,
});
