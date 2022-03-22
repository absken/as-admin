// for the local mock server
const EXTERNAL_MOCK_API_SERVER = 'https://as-admin.herokuapp.com';
const LOCAL_MOCK_API_SERVER = 'http://localhost:3005';

const LOCAL_API_SERVER = 'http://localhost:3005';
const PRODUCT_API_SERVER = `${window.location.origin}/api`;

let API_URL;

switch (process.env.REACT_APP_STAGE) {
  case 'mock':
    API_URL = LOCAL_MOCK_API_SERVER;
    break;
  case 'extMock':
    API_URL = EXTERNAL_MOCK_API_SERVER;
    break;
  case 'development':
    API_URL = LOCAL_API_SERVER;
    break;
  case 'production':
    API_URL = PRODUCT_API_SERVER;
    break;
  default:
    API_URL = LOCAL_API_SERVER;
}

// general configuration constants
export const appConfig = {
  app: {
    projectUrl: API_URL,
    defaultThemeType: 'light',
  },
  auth: {
    loginUrl: '/login',
    afterLoginUrl: '/',
    authUrl: `${API_URL}/auth/authenticate`,
    extendSessionUrl: `${API_URL}/auth/extend-session`,
    authKey: 'asAdminUser',
    tokenName: 'asAdminToken',
    secondsLeftBeforeSessionTimeout: 1450,
  },
};
