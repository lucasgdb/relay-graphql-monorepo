import { errorConfig, getError } from '@example/shared';
import { Notification } from '@example/ui';
import { useMutation } from 'relay-hooks';
import Button from '@material-ui/core/Button';

import CreateUserMutation from '../modules/auth/CreateUserMutation';
import jwtToken from '../utils/jwtToken';

const RegisterButton = () => {
  const { enqueueSnackbar } = Notification.useSnackbar();

  const [createUserMutation, { loading }] = useMutation(CreateUserMutation, {
    onCompleted: ({ createUser }) => {
      jwtToken.set(createUser.jwtToken);
      location.reload();
    },
    onError: errors => {
      const { duplicatedEmail } = errorConfig.user;
      const isUserAlreadyExists = getError(errors, duplicatedEmail.code);

      if (isUserAlreadyExists) {
        enqueueSnackbar('Este usuário já existe!', { variant: 'error' });
      }
    },
  });

  const handleClick = () =>
    createUserMutation({
      variables: {
        input: {
          name: 'Lucas',
          lastname: 'Bittencourt',
          email: 'lucasgdbittencourt@gmail.com',
          password: '123',
        },
      },
    });

  return (
    <Button color="primary" onClick={handleClick} disabled={loading}>
      Register
    </Button>
  );
};

export default RegisterButton;
