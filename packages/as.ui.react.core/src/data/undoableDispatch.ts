import { NotificationsActions } from '../store';
import undoableEventEmitter from './undoableEventEmitter';
import config from '../config/defaultConfig';
import { UndoableDispatch } from '../types';

const undoableDispatch = ({
  dispatch,
  immediateDispatch = () => {},
  undoDispatch = () => {},
  delayedDispatch = () => {},
}: UndoableDispatch) => {
  if (window) {
    window.addEventListener('beforeunload', warnBeforeClosingWindow, {
      capture: true,
    });
  }

  immediateDispatch();

  dispatch(
    NotificationsActions.showNotification('app.notification.deleted', 'plain', { undoable: true })
  );

  undoableEventEmitter.once(config.events.data.undo, ({ isUndo }) => {
    if (isUndo) {
      dispatch(
        NotificationsActions.showNotification('app.notification.deletionCancelled', 'plain', {})
      );
      if (window) {
        window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
          capture: true,
        });
      }

      undoDispatch();

      return;
    }

    delayedDispatch();
  });

  return Promise.resolve({});
};

const warnBeforeClosingWindow = (event: BeforeUnloadEvent) => {
  event.preventDefault(); // standard
  // eslint-disable-next-line no-param-reassign
  event.returnValue = ''; // Chrome
  return 'Your latest modifications are not yet sent to the server. Are you sure?'; // Old IE
};

export default undoableDispatch;
