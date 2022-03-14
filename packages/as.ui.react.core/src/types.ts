import { ReactNode, Dispatch } from 'react';
import { History } from 'history';
import { Store } from 'redux';

import { CoreReduxState } from './store/core.reducer';

export { CoreReduxState };

export type CustomInterceptor = (
  store: Store<any>
) => (next: (action: any) => void) => (action: any) => void;

export interface CoreProps {
  children?: ReactNode;
  history?: History;
  initialState?: object | (() => object);
  appCustomReducers?: any;
  appCustomInterceptor?: CustomInterceptor;
  appConfig?: object;
  appNavigation?: object[];
}

export interface AppNavigation {
  component?: any;
  name?: string;
  to?: string;
  icon?: any;
  badge?: any;
  visibleGroup?: string;
  autoInitPage?: boolean;
  items?: AppNavigation[];
}

export type Next = (error?: any, responseData?: any, response?: any) => void | undefined;

export interface ApiCallOptions {
  headers?: Headers;
  query?: any;
  fetchOptions?: object;
}

export type Translate = (key: string, options?: any) => string;

export type I18nProvider = {
  translate: Translate;
  changeLocale: (locale: string, options?: any) => Promise<void>;
  getLocale: () => string;
  getPolyglot: () => any;
  [key: string]: any;
};

export interface UndoableDispatch {
  dispatch: Dispatch<any>;
  immediateDispatch: () => void;
  undoDispatch: () => void;
  delayedDispatch: () => void;
}

export interface SessionCheckerContentProps {
  expiryTimestamp: Date;
  onExpire: () => void;
  pauseRef: any;
}

export interface LocationState {
  nextPathname: string;
  nextSearch: string;
  [key: string]: any;
}
