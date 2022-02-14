import { graphql, useQuery } from 'relay-hooks';

import LogoutButton from '../LogoutButton';
import { WelcomeQuery } from './__generated__/WelcomeQuery.graphql';

const query = graphql`
  query WelcomeQuery {
    viewer @required(action: LOG) {
      fullname
      email
    }
  }
`;

export default function Welcome() {
  const { data, error, isLoading } = useQuery<WelcomeQuery>(query);

  if (isLoading) {
    return <div>Carregando</div>;
  }

  if (error || !data) {
    return null;
  }

  return (
    <div>
      <p>
        Olá, {data.viewer?.fullname}! Seu e-mail é {data.viewer?.email}!
      </p>

      <LogoutButton />
    </div>
  );
}
