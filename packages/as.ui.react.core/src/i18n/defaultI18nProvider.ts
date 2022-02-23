import getPolyglotI18nProvider from './getPolyglotI18nProvider';

export const defaultMessageResource = {
  en: {
    'app.auth.pleaseLogin': 'Please login to continue!',
    'app.auth.sessionEnded': 'Your session has ended. Please login to continue!',
    'app.auth.sessionChecker.title': 'Session timeout warning',
    'app.auth.sessionChecker.continueSession': 'Continue session',
    'app.auth.sessionChecker.logoutNow': 'Logout now',
    'app.auth.sessionChecker.content.sessionExpire': 'Your session will expire automatically in',
    'app.auth.sessionChecker.content.unsavedChanges': 'Unsaved changes will be lost.',
    'app.auth.sessionChecker.content.selectContinueSession':
      'Select "Continue session" to extend your session.',
    'app.title': 'AbsenceSoft React App Boilerplate',
    'app.breadcrumb.home': 'Home',
    'app.error.general': 'AbsenceSoft server encountered an unexpected error',
    'app.notification.undo': 'UNDO',
    'app.notification.deleted': 'Deleted successfully',
    'app.notification.deletionCancelled': 'Deletion cancelled',
    'app.actions.cancel': 'Cancel',
    'app.actions.confirm': 'Confirm',
  },
  fr: {},
};

const defaultI18nProvider = getPolyglotI18nProvider((locale: string) => {
  // only synchronous way supported
  // @ts-ignore
  return defaultMessageResource[locale];
}, 'en');

export default defaultI18nProvider;
