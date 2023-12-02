/* eslint-disable operator-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
// import { createLogger } from 'redux-logger';

import rootReducer from './reducers'; // Ensure this is updated for Redux Toolkit
import { generalApi } from './services/landing';
import { movieApi } from './services/movie';
import { showApi } from './services/show';
import { ticketApi } from './services/allTickets';
import { theaterWiseShowApi } from './services/theaterWiseShows';
import { theaterApi } from './services/theater';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const middlewares = [
  generalApi.middleware,
  movieApi.middleware,
  showApi.middleware,
  ticketApi.middleware,
  theaterWiseShowApi.middleware,
  theaterApi.middleware,
];

// if (process.env.NODE_ENV === 'development') {
//   const logger = createLogger({ collapsed: true, diff: true });
//   middlewares.push(logger);
// }

export const store = configureStore({
  reducer: rootReducer(routerReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware).concat(middlewares),
});

export const history = createReduxHistory(store);
