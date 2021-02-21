import styled from 'styled-components';

import Welcome from '../../components/Home/Welcome';

const OuterHomePage = styled.div``;

const HomePage = () => (
  <OuterHomePage>
    <Welcome />
  </OuterHomePage>
);

export default HomePage;
