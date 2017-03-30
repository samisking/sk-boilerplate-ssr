/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import initialState from './initialState';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const configureStore = (state = initialState) => createStore(
  reducers,
  state,
  composeEnhancers(applyMiddleware(thunk))
);

export { default as reducers } from './reducers';
export { default as initialState } from './initialState';
