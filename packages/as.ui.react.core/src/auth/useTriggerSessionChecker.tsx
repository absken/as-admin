import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { MdLogout, MdOutlinePlayCircleOutline } from 'react-icons/md';
import SessionTimeoutTimer from './SessionTimeoutTimer';
import { AuthActions, ConfirmActions } from '../store';
import { getToken } from './tokenService';
import useLogout from './useLogout';
import { useTranslate } from '../i18n';
import { SessionCheckerContentProps } from '../types';

function SessionCheckerContent(props: SessionCheckerContentProps) {
  const { expiryTimestamp, onExpire, pauseRef } = props;

  const translate = useTranslate();

  return (
    <span>
      {translate('app.auth.sessionChecker.content.sessionExpire')}{' '}
      <SessionTimeoutTimer
        expiryTimestamp={expiryTimestamp}
        onExpire={onExpire}
        pauseRef={pauseRef}
      />
      . <br />
      {translate('app.auth.sessionChecker.content.unsavedChanges')} <br />
      {translate('app.auth.sessionChecker.content.selectContinueSession')}
    </span>
  );
}

SessionCheckerContent.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date),
  onExpire: PropTypes.func,
  pauseRef: PropTypes.objectOf(PropTypes.any),
};

const timeoutRef = { ref: null };

/**
 * @example
 *
 * import { useTriggerSessionChecker } from 'app-name';
 *
 * const Page = () => {
 *     useTriggerSessionChecker();
 *     return <div>A sample page</div>;
 * }
 */
const useTriggerSessionChecker = () => {
  const dispatch = useDispatch();
  const logout = useLogout();
  const pauseRef = useRef(null);

  const terminateSession = useCallback(
    (redirectToCurrentLocationAfterLogin) => {
      // @ts-ignore
      typeof pauseRef.current === 'function' && pauseRef.current();
      setTimeout(() => {
        logout({}, undefined, redirectToCurrentLocationAfterLogin);
      }, 0);
    },
    [logout]
  );

  const onContinueSession = useCallback(() => {
    dispatch(
      AuthActions.extendSession(() => {
        dispatch(ConfirmActions.hideConfirm());
        checkSession();
      })
    );
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const onTerminateSession = useCallback(() => {
    dispatch(ConfirmActions.hideConfirm());
    terminateSession(false);
  }, [terminateSession, dispatch]);

  const checkSession = useCallback(() => {
    // @ts-ignore
    timeoutRef && timeoutRef.ref && clearTimeout(timeoutRef.ref);

    const tokenInfo = getToken();
    const interval = tokenInfo.intervalForAlert;
    const expirationDatetime = tokenInfo.tokenExpirationDatetime;

    // 5sec for making sure process happens
    if (interval <= 5000) {
      if (new Date() > expirationDatetime) {
        terminateSession(true);
      } else {
        dispatch(
          ConfirmActions.showConfirm(
            'app.auth.sessionChecker.title',
            <SessionCheckerContent
              expiryTimestamp={expirationDatetime}
              onExpire={() => terminateSession(true)}
              pauseRef={pauseRef}
            />,
            {
              cancelLabel: 'app.auth.sessionChecker.continueSession',
              confirmLabel: 'app.auth.sessionChecker.logoutNow',
              onCancel: onContinueSession,
              CancelIcon: MdOutlinePlayCircleOutline,
              onConfirm: onTerminateSession,
              ConfirmIcon: MdLogout,
            }
          )
        );
      }
    } else {
      // @ts-ignore
      timeoutRef.ref = setTimeout(checkSession, interval);
    }
  }, [terminateSession, onContinueSession, onTerminateSession, dispatch]);

  useEffect(() => {
    checkSession();

    return () => {
      // @ts-ignore
      timeoutRef && timeoutRef.ref && clearTimeout(timeoutRef.ref);
      dispatch(ConfirmActions.hideConfirm());
    };
  }, [checkSession, dispatch]);
};

export default useTriggerSessionChecker;
