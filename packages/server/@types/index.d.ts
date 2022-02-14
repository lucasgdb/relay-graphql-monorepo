declare namespace Express {
  type UserType = import('../src/models/User').default;
  type LoginType = import('../src/models/Login').default;

  export interface Request {
    user?: UserType;
    login?: LoginType;
    start?: number;
  }
}
