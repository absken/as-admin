// general configuration constants
import { ReactNode } from 'react';
import { CustomInterceptor } from '../types';

const API_SERVER: string = 'http://localhost:3005';

export interface DefaultConfig {
  app: {
    projectUrl: string;
    defaultThemeType: string;
  };
  auth: {
    loginUrl: string;
    afterLoginUrl: string;
    authUrl: string;
    extendSessionUrl: string;
    authKey: string;
    tokenName: string;
    timeToLiveSeconds: number;
    secondsLeftBeforeSessionTimeout: number;
  };
  events: {
    data: {
      undo: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
}

const defaultConfig = {
  app: {
    projectUrl: API_SERVER,
    defaultThemeType: 'light',
  },
  auth: {
    loginUrl: '/login',
    afterLoginUrl: '/',
    authUrl: `${API_SERVER}/auth/authenticate`,
    extendSessionUrl: `${API_SERVER}/auth/extend-session`,
    authKey: 'AbsUser',
    tokenName: 'AbsToken',
    timeToLiveSeconds: 1800, // 1800
    secondsLeftBeforeSessionTimeout: 300, // 300
  },
  events: {
    data: {
      undo: 'data.undo',
    },
  },
};

export default defaultConfig;
