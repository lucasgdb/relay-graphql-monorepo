import { useMutation } from 'relay-hooks';
import Button from '@material-ui/core/Button';

import LogoutMutation from '../modules/auth/LogoutMutation';
import jwtToken from '../utils/jwtToken';

const LogoutButton = () => {
  const [logoutMutation, { loading }] = useMutation(LogoutMutation, {
    onCompleted: () => {
      jwtToken.destroy();
      location.reload();
    },
  });

  const handleClick = () => logoutMutation({ variables: { input: {} } });

  return (
    <Button color="primary" onClick={handleClick} disabled={loading}>
      Logout
    </Button>
  );
};

export default LogoutButton;
