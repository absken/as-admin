import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import coreInterceptor from '../store/coreInterceptor';
import createAppReducer from '../store';
import { CustomInterceptor } from '../types';
import { Store } from 'redux';
import { History } from 'history';

interface Params {
  appCustomReducers?: any;
  appCustomInterceptor?: CustomInterceptor;
  history: History;
  initialState?: object | (() => object);
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
  const middleware: any[] = [coreInterceptor, appCustomInterceptor];
  if (history) {
    middleware.push(routerMiddleware(history));
  }

  if (
    process.env.REACT_APP_STAGE !== 'production' &&
    process.env.REDUX_LOGGER_OFF !== 'true' &&
    typeof window !== 'undefined'
  ) {
    const { logger } = require(`redux-logger`);
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({ serializableCheck: false }),
      ...middleware,
    ],
    devTools: process.env.REACT_APP_STAGE !== 'production',
    preloadedState: typeof initialState === 'function' ? initialState() : initialState,
  });

  return store;
};

export default createAppCoreStore;

type AppStore = ReturnType<typeof createAppCoreStore>;

type AppStoreGetState = AppStore['getState'];
export type CoreState = ReturnType<AppStoreGetState> & { [key: string]: any };

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  CoreState,
  unknown,
  Action<string>
>;
