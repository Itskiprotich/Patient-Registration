import { Middleware } from 'redux';

export const storeMiddleWare: Middleware = (store) => (next) => (action) => {
  return next({ ...action, getState: store.getState });
};
