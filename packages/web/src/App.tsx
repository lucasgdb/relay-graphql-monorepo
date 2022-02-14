import { ErrorBoundary } from '@example/components';
import CssBaseline from '@mui/material/CssBaseline';

import Providers from './Providers';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles from './GlobalStyles';

export default function App() {
  return (
    <Providers>
      <CssBaseline />
      <GlobalStyles />

      <ErrorBoundary onActionClick={() => window.location.reload()}>
        <AppRoutes />
      </ErrorBoundary>
    </Providers>
  );
}
