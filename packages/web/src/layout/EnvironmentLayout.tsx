import { graphql, useQuery } from 'relay-hooks';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import { EnvironmentLayoutQuery } from './__generated__/EnvironmentLayoutQuery.graphql';
import LoginButton from '~/components/LoginButton';
import RegisterButton from '~/components/RegisterButton';
import PageLoader from '~/components/PageLoader';

const query = graphql`
  query EnvironmentLayoutQuery {
    auth {
      isLogged
    }
  }
`;

const OuterEnvironmentLayout = styled.div``;

export default function EnvironmentLayout() {
  const { data, isLoading } = useQuery<EnvironmentLayoutQuery>(query);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data?.auth?.isLogged) {
    return (
      <Container>
        <p>Você não está autenticado!</p>

        <LoginButton />
        <RegisterButton />
      </Container>
    );
  }

  return (
    <OuterEnvironmentLayout>
      <Outlet />
    </OuterEnvironmentLayout>
  );
}
