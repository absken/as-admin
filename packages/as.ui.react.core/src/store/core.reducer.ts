import { combineReducers } from 'redux';

import ui from '../ui/store/ui.reducer';
import loading from '../loading/store/loading.reducer';
import notifications from '../notificaton/store/notifications.reducer';
import breadcrumbs from '../breadcrumb/store/breadcrumbs.reducer';
import confirm from '../confirm/store/confirm.reducer';
import navigation from '../navigation/store/navigation.reducer';

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
