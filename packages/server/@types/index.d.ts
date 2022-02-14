declare namespace Express {
  type IUser = import('../src/models/IUser').default;
  type ILogin = import('../src/models/ILogin').default;

  export interface Request {
    user?: IUser;
    loginId?: ILogin['id'];
    start?: number;
  }
}
