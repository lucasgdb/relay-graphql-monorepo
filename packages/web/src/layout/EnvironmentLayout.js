import { errorConfig, getError } from '@example/shared';
import { graphql, useQuery } from 'relay-hooks';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';

const query = graphql`
  query EnvironmentLayoutQuery {
    viewer {
      id
    }
  }
`;

const OuterEnvironmentLayout = styled.div``;

const EnvironmentLayout = ({ children }) => {
  const { error, isLoading } = useQuery(query);

  if (isLoading) {
    return <Container>Carregando</Container>;
  }

  if (error) {
    const { unauthenticated } = errorConfig.user;
    const isUnauthenticated = getError(error, unauthenticated.code);

    if (isUnauthenticated) {
      return (
        <Container>
          <p>Você não está autenticado!</p>
          <LoginButton />
          <RegisterButton />
        </Container>
      );
    }
  }

  return (
    <Container>
      <OuterEnvironmentLayout>{children}</OuterEnvironmentLayout>
    </Container>
  );
};

EnvironmentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EnvironmentLayout;
