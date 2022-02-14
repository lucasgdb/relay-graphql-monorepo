import { useMutation } from 'relay-hooks';
import Button from '@mui/material/Button';

import jwtToken from '../utils/jwtToken';
import LoginMutation from '~/modules/auth/LoginMutation';
import { LoginMutation as LoginMutationType } from '~/modules/auth/__generated__/LoginMutation.graphql';

export default function LoginButton() {
  const [loginMutation, { loading }] = useMutation<LoginMutationType>(
    LoginMutation,
    {
      onCompleted: ({ login }) => {
        if (login?.jwtToken) {
          jwtToken.set(login.jwtToken);
          window.location.reload();
        }
      },
    }
  );

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
}
