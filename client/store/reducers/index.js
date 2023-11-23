import { combineReducers } from 'redux';

import auth from '../features/authSlice';
import { pokemonApi } from '../services/landing';

const createRootReducer = (routerReducer) =>
  combineReducers({
    router: routerReducer,
    auth,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  });

export default createRootReducer;
