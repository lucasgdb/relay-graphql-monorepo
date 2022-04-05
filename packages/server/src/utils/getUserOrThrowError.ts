import { errorConfig } from '@example/shared';

import { IContext } from '~/interfaces';

const getUserOrThrowError = (context: IContext) => {
  if (!context.user?.id) {
    throw new Error(errorConfig.user.unauthenticated.code);
  }

  return context.user;
};

export default getUserOrThrowError;
