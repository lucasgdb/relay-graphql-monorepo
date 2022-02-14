import { Route, Routes, HashRouter } from 'react-router-dom';

import EnvironmentLayout from '~/layout/EnvironmentLayout';
import ErrorPage from '~/pages/Error/ErrorPage';
import HomePage from '~/pages/Home/HomePage';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<EnvironmentLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
