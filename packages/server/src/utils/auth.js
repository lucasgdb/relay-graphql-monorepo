import { dbConnect } from '@example/connectors';
import { UserModel, AuthModel } from '@example/entities';
import { ApplicationError, errorConfig } from '@example/shared';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const authEntity = AuthModel(dbConnect);
const userEntity = UserModel(dbConnect);

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const getUserOrThrowError = async context => {
  if (!context.user || !context.user.id) {
    throw new ApplicationError(errorConfig.user.unauthenticated.code);
  }

  const user = await userEntity.getUserById(context.user.id);

  return user;
};

export default () => {
  const strategy = new Strategy(params, (payload, done) => {
    const { id } = payload;

    return done(null, { id });
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => (req, res, next) => {
      passport.authenticate('jwt', async (err, payload) => {
        if (err) {
          return next(err);
        }

        if (payload) {
          const { id } = payload;

          const login = await authEntity.getLoginById(id);

          if (login && login.active) {
            const user = await userEntity.getUserById(login.userId);

            req.login = { id: login.id };
            req.user = user;
          }
        }

        return next();
      })(req, res, next);
    },
  };
};
