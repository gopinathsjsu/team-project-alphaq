/* eslint-disable operator-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers'; // Ensure this is updated for Redux Toolkit
import { pokemonApi } from './services/landing';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const middlewares = [pokemonApi.middleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true, diff: true });
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: rootReducer(routerReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware).concat(middlewares),
});

export const history = createReduxHistory(store);
