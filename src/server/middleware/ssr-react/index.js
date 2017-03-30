import matchRoutesToLocation from './match';
import renderApp from './renderApp';
import routes from '../../../shared/routes';
import { configureStore } from '../../../shared/state';

export default ctx =>
  new Promise((resolve) => {
    // 1. Match all routes to the current url
    // 2. Call any actions that need to be used in the server render (think critical data, not
    //    things that could be lazy loaded on the client) by using a static method on the component
    // 3. Render the React app to a HTML string with the initial store data in the DOM for the
    //    client to pick up later.

    const store = configureStore();
    const { matchedRoutes, params } = matchRoutesToLocation(routes, ctx.url);

    if (matchedRoutes.length === 0) {
      // Set the 404 status here if there were no matches.
      // The `renderApp` function will render a custom 404 page from the app later.
      ctx.status = 404;
    }

    const ensureData = matchedRoutes.map((route) => {
      if (typeof route.component.ensureData !== 'function') {
        return false;
      }

      return route.component.ensureData({
        dispatch: store.dispatch,
        matchParams: params
      });
    });

    return Promise.all(ensureData).then(() => {
      const { context, html } = renderApp({ location: ctx.url, store });

      if (context.url && context.location) {
        ctx.redirect(`${context.url}${ctx.querystring ? `?${ctx.querystring}` : ''}`);
      }

      ctx.body = `<!DOCTYPE html>${html}`;
      resolve();
    });
  });
