import { graphql, useQuery } from 'relay-hooks';
import Container from '@mui/material/Container';

import { homeQuery } from './__generated__/homeQuery.graphql';
import Articles from '../components/Home/Articles';

const query = graphql`
  query homeQuery {
    system {
      ...Articles_system
    }
  }
`;

export default function HomePage() {
  const { data, error, isLoading } = useQuery<homeQuery>(query);

  if (isLoading) {
    console.log('loading');
    return null;
  }

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <Container>
      <Articles system={data!.system!} />
    </Container>
  );
}
