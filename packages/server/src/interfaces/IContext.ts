import type ILogin from '~/models/ILogin';
import type IUser from '~/models/IUser';

type IContext = {
  user: IUser | undefined;
  login: ILogin | undefined;
};

export default IContext;
