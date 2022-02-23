import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import * as AuthActions from '../auth/store/auth.action';
import * as BreadcrumbsActions from '../breadcrumb/store/breadcrumbs.action';
import * as LoadingActions from '../loading/store/loading.action';
import * as NavigationActions from '../navigation/store/navigation.action';
import * as NotificationsActions from '../notificaton/store/notifications.action';
import * as UiActions from '../ui/store/ui.action';
import * as ConfirmActions from '../confirm/store/confirm.action';

import auth from '../auth/store/auth.reducer';
import core from './core.reducer';

interface CustomReducers {
  [key: string]: Reducer;
}

const appReducer = (appCustomReducers: CustomReducers, history: History) =>
  combineReducers({
    auth,
    core,
    router: connectRouter(history),
    ...appCustomReducers,
  });

export default appReducer;

export {
  AuthActions,
  BreadcrumbsActions,
  LoadingActions,
  NavigationActions,
  NotificationsActions,
  UiActions,
  ConfirmActions,
};
