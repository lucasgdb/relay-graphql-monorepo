import { Route, Switch, HashRouter } from 'react-router-dom';

import EnvironmentLayout from './layout/EnvironmentLayout';
import HomePage from './pages/Home/HomePage';

const Routes = () => (
  <HashRouter>
    <EnvironmentLayout>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </EnvironmentLayout>
  </HashRouter>
);

export default Routes;
