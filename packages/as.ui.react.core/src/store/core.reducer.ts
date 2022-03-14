import { combineReducers } from 'redux';

import { AuthState } from '../auth/store/auth.reducer';
import ui, { UiState } from '../ui/store/ui.reducer';
import loading, { LoadingState } from '../loading/store/loading.reducer';
import notifications, { NotificationState } from '../notificaton/store/notifications.reducer';
import breadcrumbs, { BreadcrumbState } from '../breadcrumb/store/breadcrumbs.reducer';
import confirm, { ConfirmState } from '../confirm/store/confirm.reducer';
import navigation, { NavigationState } from '../navigation/store/navigation.reducer';

export interface CoreReduxState {
  auth: AuthState;
  core: {
    ui: UiState;
    appLoading: LoadingState;
    notifications: NotificationState;
    breadcrumbs: BreadcrumbState;
    confirm: ConfirmState;
    navigation: NavigationState;
  };
  router: {
    location: Location;
  };

  // leave space for custom reducers
  [key: string]: any;
}

const defaultReducer = () => null;

const coreReducer = combineReducers({
  ui: ui || defaultReducer,
  appLoading: loading || defaultReducer,
  notifications: notifications || defaultReducer,
  breadcrumbs: breadcrumbs || defaultReducer,
  confirm: confirm || defaultReducer,
  navigation: navigation || defaultReducer,
});

export default coreReducer;
