import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Import any global CSS before the routes to preserve CSS order when extracted
import '../../css/Global.css';

import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import NotFound from '../../screens/NotFound';
import routes from '../../routes';

export const AppContainer = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/counter">Counter</Link></li>
      <li><Link to="/topics">Topics</Link></li>
      <li><Link to="/a-redirect">Redirect Route (look at the url and where you go)</Link></li>
    </ul>

    <hr />

    <Switch>
      {routes.map(route =>
        <RouteWithSubRoutes key={route.path} {...route} />
      )}
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default AppContainer;
