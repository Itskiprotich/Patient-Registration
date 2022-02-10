import { storeMiddleWare } from './../middleware/index';
import { StateInterface } from './../interfaces/index';
import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk'; 
import { persistStore } from 'redux-persist'; 
import rootReducers from '../reducers';
const middlewares = [
  thunk as ThunkMiddleware<StateInterface, any>,
  storeMiddleWare,
];

export const configureStore = () => {
  const store = createStore(rootReducers, {}, applyMiddleware(...middlewares));
  return { store, persistedStore: persistStore(store) };
};
