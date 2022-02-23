import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import coreInterceptor from './store/coreInterceptor';
import createAppReducer from './store';
import { CustomInterceptor } from './types';
import { Store } from 'redux';
import { History } from 'history';

interface Params {
  appCustomReducers?: any;
  appCustomInterceptor?: CustomInterceptor;
  history: History;
  initialState?: object | (() => object);
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (traceOptions: object) => Function;
}

const defaultInterceptor =
  (store: Store<object>) => (next: (action: any) => void) => (action: any) => {
    next(action);
  };

const createAppCoreStore = ({
  appCustomReducers = {},
  appCustomInterceptor = defaultInterceptor,
  history,
  initialState,
}: Params) => {
  const appReducer = createAppReducer(appCustomReducers, history);
  const middleware: any[] = [thunk, coreInterceptor, appCustomInterceptor];
  if (history) {
    middleware.push(routerMiddleware(history));
  }

  // if there is any
  const addonEnhancers: any[] = [];

  // install dev tools as you need
  const typedWindow = typeof window !== 'undefined' && (window as Window);
  const composeEnhancers =
    (process.env.REACT_APP_STAGE !== 'production' &&
      typedWindow !== false &&
      typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  if (process.env.REACT_APP_STAGE !== 'production' && typeof window !== 'undefined') {
    const { logger } = require(`redux-logger`);
    middleware.push(logger);
  }

  const cpEnhancers = composeEnhancers(applyMiddleware(...middleware), ...addonEnhancers);

  const store: Store<any, any> = createStore(
    appReducer,
    typeof initialState === 'function' ? initialState() : initialState,
    cpEnhancers
  );

  return store;
};

export default createAppCoreStore;
