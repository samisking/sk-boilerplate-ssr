import { matchPath } from 'react-router';

// Matches a 'react-router' route from a route config to a URL and returns all routes that match.
const matchRoutesToLocation = (
  routes,
  location,
  matchedRoutes = [],
  params = {}
) => {
  routes.forEach((route) => {
    const { exact = false } = route;
    const match = !route.path ? true : matchPath(location, { path: route.path, exact });

    if (match) {
      matchedRoutes.push(route);

      if (match.params) {
        Object.keys(match.params).forEach((key) => {
          // eslint-disable-next-line no-param-reassign
          params[key] = match.params[key];
        });
      }

      if (route.routes) {
        matchRoutesToLocation(route.routes, location, matchedRoutes, params);
      }
    }
  });

  return { matchedRoutes, params };
};

export default matchRoutesToLocation;
