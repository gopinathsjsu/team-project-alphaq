import { combineReducers } from 'redux';

import auth from '../features/auth/auth.slice';
import home from '../features/homeSlice';
import { pokemonApi } from '../services/landing';
import { movieApi } from '../services/movie';
import { showApi } from '../services/show';

const createRootReducer = (routerReducer) =>
  combineReducers({
    router: routerReducer,
    auth,
    home,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [showApi.reducerPath]: showApi.reducer,
  });

export default createRootReducer;
