import { Dispatch } from 'react';
import lodIsEmpty from 'lodash/isEmpty';

import { AuthActions, NotificationsActions } from '../store';
import { captureErrorMessage } from '../utils';
import { defaultConfig } from '../config';
import { getStoredHistoryInstance } from '../getHistory';

const handleFetchError = (dispatch: Dispatch<any>, action: any) => {
  const history = getStoredHistoryInstance();
  const error = action.meta && action.meta.error;

  if (!lodIsEmpty(error)) {
    setTimeout(() => {
      if (error.status === 401 || error.status === 403) {
        dispatch(
          AuthActions.authLogout(null, () => {
            // redirectTo can contain a query string, e.g. '/login?foo=bar'
            // we must split the redirectTo to pass a structured location to history.push()
            const redirectToParts = defaultConfig.auth.loginUrl.split('?');
            const newLocation = {
              pathname: redirectToParts[0],
              search: '',
            };
            if (redirectToParts[1]) {
              newLocation.search = redirectToParts[1];
            }
            history && history.push(newLocation);
          })
        );
        dispatch(NotificationsActions.showNotification('app.auth.sessionEnded', 'error'));
      } else {
        dispatch(
          NotificationsActions.showNotification(
            captureErrorMessage(error, 'app.error.general'),
            'error',
            { autoHideDuration: 30000 }
          )
        );
      }
    }, 0);
  }
};

export default handleFetchError;
