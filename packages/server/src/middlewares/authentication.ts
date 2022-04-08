import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Context, Next } from 'koa';

import { UserModel, AuthModel } from '~/entities';
import exampleConnector from '~/database/exampleConnector';

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const getPayload = (ctx: Context): Promise<{ id: string }> | false => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    })(ctx.request, ctx.response);
  });
};

const authentication = () => {
  const strategy = new Strategy(params, (payload: { id: string }, done) => {
    const { id } = payload;

    return done(null, { id });
  });

  passport.use(strategy);

  return {
    initialize: (_ctx: Context, next: Next) => {
      passport.initialize();
      return next();
    },
    authenticate: async (ctx: Context, next: Next) => {
      const payload = await getPayload(ctx);
      if (!payload) {
        return next();
      }

      const authEntity = AuthModel(exampleConnector);

      const login = await authEntity.getLoginBy({ id: payload.id });
      if (!login?.active) {
        return next();
      }

      const userEntity = UserModel(exampleConnector);
      const user = await userEntity.getUserBy({ id: login.user_id });

      ctx.request.loginId = login.id;
      ctx.request.user = user;

      return next();
    },
  };
};

export default authentication;
