import React from 'react';
import { Redirect } from 'react-router-dom';

// In production client bundle, routes.sync module will be replaced with routes.async
import * as Routes from './routes.sync';

// The route config used by react-router
const routes = [
  {
    path: '/',
    exact: true,
    component: Routes.Home
  },
  {
    path: '/counter',
    component: Routes.Counter
  },
  {
    path: '/topics',
    component: Routes.Topics,
    routes: [
      {
        path: '/topics/:topicId',
        component: Routes.Topics
      }
    ]
  },
  {
    path: '/a-redirect',
    component: () => <Redirect to="/counter" />
  }
];

export default routes;
