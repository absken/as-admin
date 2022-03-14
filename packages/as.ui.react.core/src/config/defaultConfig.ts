//general configuration constants
const API_SERVER: string = 'http://localhost:3005';

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
    secondsLeftBeforeSessionTimeout: 300, //300
  },
  events: {
    data: {
      undo: 'data.undo',
    },
  },
};

export default defaultConfig;
