import { graphql, useQuery } from 'relay-hooks';
import LogoutButton from '../LogoutButton';

const query = graphql`
  query WelcomeQuery {
    viewer {
      id
      fullname
      email
    }
  }
`;

const Welcome = () => {
  const { data, error, isLoading } = useQuery(query);

  if (isLoading) {
    return <div>Carregando</div>;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      <p>
        Olá, {data.viewer.fullname}! Seu e-mail é {data.viewer.email}!
      </p>

      <LogoutButton />
    </div>
  );
};

export default Welcome;
