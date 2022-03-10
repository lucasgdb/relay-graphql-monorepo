import Cookies from 'universal-cookie';

const AuthorizationHeader = 'Web-Example-Authorization';

const jwtToken = {
  set(token: string) {
    return new Cookies().set(AuthorizationHeader, `Bearer ${token}`, {
      path: '/',
      domain: 'localhost',
    });
  },

  get() {
    return decodeURIComponent(new Cookies().get(AuthorizationHeader) ?? '');
  },

  destroy() {
    return new Cookies().remove(AuthorizationHeader, {
      path: '/',
      domain: 'localhost',
    });
  },
};

export default jwtToken;
