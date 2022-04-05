import type ILogin from './ILogin';
import type IUser from './IUser';

type IContext = {
  user: IUser | undefined;
  loginId: ILogin['id'];
};

export default IContext;
