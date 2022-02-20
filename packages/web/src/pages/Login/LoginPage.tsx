import { graphql, useQuery } from 'relay-hooks';
import Container from '@mui/material/Container';

import { LoginPageQuery } from './__generated__/LoginPageQuery.graphql';
import PageLoader from '~/components/PageLoader';
import { DefaultErrorPage } from '@example/components';
import Articles from '~/components/Home/Articles';
import LoginButton from '~/components/LoginButton';
import RegisterButton from '~/components/RegisterButton';

const query = graphql`
  query LoginPageQuery {
    system {
      ...Articles_system
    }
  }
`;

export default function LoginPage() {
  const { data, error, isLoading } = useQuery<LoginPageQuery>(query);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <DefaultErrorPage
        title="Ooops!"
        description="Aconteceu um problema."
        information={`Ocorreu um erro do servidor. Código de erro: ${error.message}`}
        actionText="Tentar novamente"
        onActionClick={() => window.location.reload()}
        disableOptionalButton
      />
    );
  }

  return (
    <Container>
      <p>Você não está autenticado!</p>

      <LoginButton />
      <RegisterButton />

      <Articles system={data!.system!} />
    </Container>
  );
}
