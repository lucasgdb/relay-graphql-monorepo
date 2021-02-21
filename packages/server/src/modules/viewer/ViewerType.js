import UserType from '../user/UserType';
import { getUserOrThrowError } from '../../utils/auth';

export default {
  type: UserType,
  resolve: (_root, _args, context) => getUserOrThrowError(context),
};
