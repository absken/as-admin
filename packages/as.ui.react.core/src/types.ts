import { ReactNode, Dispatch } from 'react';
import { ThemeOptions } from '@mui/material';
import { History } from 'history';
import { Store } from 'redux';

export type CustomInterceptor = (
  store: Store<any>
) => (next: (action: any) => void) => (action: any) => void;

export interface CoreProps {
  theme: ThemeOptions;
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

export interface CoreReduxState {
  auth: {
    location: Location;
  };
  core: {
    ui: any;
    appLoading: any;
    notifications: any;
    breadcrumbs: any;
    confirm: any;
    navigation: any;
  };
  router: {
    location: Location;
  };

  // leave space for custom reducers
  [key: string]: any;
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
