import { ErrorBoundary } from '@example/ui';
import Providers from './Providers';
import Routes from './routes';

import GlobalStyles from './GlobalStyles';

const App = () => (
  <ErrorBoundary>
    <GlobalStyles />
    <Providers>
      <Routes />
    </Providers>
  </ErrorBoundary>
);

export default App;
