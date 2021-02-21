import { useMutation } from 'relay-hooks';
import Button from '@material-ui/core/Button';

import jwtToken from '../utils/jwtToken';
import LoginMutation from '../modules/auth/LoginMutation';

const LoginButton = () => {
  const [loginMutation, { loading }] = useMutation(LoginMutation, {
    onCompleted: ({ login }) => {
      jwtToken.set(login.jwtToken);
      location.reload();
    },
  });

  const handleClick = () => {
    loginMutation({
      variables: {
        input: { email: 'lucasgdbittencourt@gmail.com', password: '123' },
      },
    });
  };

  return (
    <Button color="secondary" onClick={handleClick} disabled={loading}>
      Login
    </Button>
  );
};

export default LoginButton;
