import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '../shared/state';
import App from '../shared/components/App';

// Grab the initial store state from the window and create a new redux store
const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
const store = configureStore(initialState);

// The element to render the client side app into
const container = document.getElementById('app');

// Function to render the client side app
const renderApp = (AppStore, AppComponent) => {
  render(
    <Provider store={AppStore}>
      <AppContainer>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </AppContainer>
    </Provider>,
    container
  );
};

if (module.hot) {
  module.hot.accept('../shared/components/App', () => {
    const NextApp = require('../shared/components/App').default;
    renderApp(store, NextApp);
  });
}

// Actually render the app client side
renderApp(store, App);
