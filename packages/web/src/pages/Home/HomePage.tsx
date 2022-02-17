import { graphql, useQuery } from 'relay-hooks';
import Container from '@mui/material/Container';

import Welcome from '~/components/Home/Welcome';
import { HomePageQuery } from './__generated__/HomePageQuery.graphql';
import PageLoader from '~/components/PageLoader';
import { DefaultErrorPage } from '@example/components';

const query = graphql`
  query HomePageQuery {
    viewer {
      ...Welcome_viewer
    }
  }
`;

export default function HomePage() {
  const { data, error, isLoading } = useQuery<HomePageQuery>(query);

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
      <Welcome viewer={data!.viewer} />
    </Container>
  );
}
