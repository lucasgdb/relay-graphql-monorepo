import { errorConfig } from '@example/shared';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request, Response, NextFunction } from 'express';

import UserModel from '~/entities/User/UserModel';
import AuthModel from '~/entities/Auth/AuthModel';
import exampleConnector from '~/database/exampleConnector';
import type IContext from '~/interfaces/IContext';

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const getUserOrThrowError = (context: IContext) => {
  if (!context.user?.id) {
    throw new Error(errorConfig.user.unauthenticated.code);
  }

  return context.user;
};

const auth = () => {
  const strategy = new Strategy(params, (payload, done) => {
    const { id } = payload;

    return done(null, { id });
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate('jwt', async (err, payload) => {
        if (err) {
          return next(err);
        }

        if (!payload) {
          return next();
        }

        const authEntity = AuthModel(exampleConnector);
        const userEntity = UserModel(exampleConnector);

        const login = await authEntity.getLoginById(payload.id);

        if (!login?.active) {
          return next();
        }

        const user = await userEntity.getUserById(login.user_id!);

        req.loginId = login.id;
        req.user = user;

        return next();
      })(req, res, next);
    },
  };
};

export default auth;
