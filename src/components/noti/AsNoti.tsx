import * as React from 'react';
import { useState, useEffect, useCallback, forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import lodMerge from 'lodash/merge';
import classnames from 'classnames';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';

import {
  undoableEventEmitter,
  useTranslate,
  NotificationsActions,
  useAppConfig,
  CoreState,
} from '@as/ui-react-core';

const Alert = forwardRef<HTMLDivElement, any>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} sx={{ minWidth: 300 }} />;
});

export interface AsNotiProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Make sidebar narrow.
   */
  type?: string;
  /**
   * Callback fired when the component requests to be hidden.
   */
  autoHideDuration?: number;
  /**
   * Set sidebar to overlaid variant.
   */
  multiLine?: boolean;
  /**
   * Callback fired when the component requests to be shown.
   */
  vertical?: string;
  /**
   * Event emitted after visibility of component changed.
   */
  horizontal?: string;
}

export const AsNoti = forwardRef<HTMLDivElement, AsNotiProps>((props, ref) => {
  const { type, className, autoHideDuration, multiLine, vertical, horizontal, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [mergedParams, setMergedParams] = useState<any>({
    type,
    className,
    autoHideDuration,
    multiLine,
    vertical,
    horizontal,
  });
  const notification = useSelector((state: CoreState) => state.core.notifications[0]);
  const dispatch = useDispatch();
  const translate = useTranslate();
  const config = useAppConfig();

  useEffect(() => {
    setMergedParams(lodMerge({}, props, notification));
    setOpen(!!notification);
  }, [notification]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRequestClose = useCallback(
    (evt, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    },
    [setOpen]
  );

  const handleExited = useCallback(() => {
    if (mergedParams.undoable) {
      dispatch(NotificationsActions.completeAction());
      undoableEventEmitter.emit(config.events.data.undo, { isUndo: false });
    }
    dispatch(NotificationsActions.hideNotification());
  }, [dispatch, notification, mergedParams.undoable]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUndo = useCallback(() => {
    dispatch(NotificationsActions.undoAction());
    undoableEventEmitter.emit(config.events.data.undo, { isUndo: true });
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderAction = () => {
    if (mergedParams.undoable) {
      return (
        <Button
          color="primary"
          sx={{
            color: 'primary.light',
          }}
          size="small"
          onClick={handleUndo}
        >
          {translate('app.notification.undo')}
        </Button>
      );
    }
    return null;
  };

  const renderChild = () => {
    if (mergedParams.message && !mergedParams.undoable && mergedParams.type !== 'plain') {
      return (
        <Alert onClose={handleRequestClose} severity={mergedParams.type}>
          {translate(mergedParams.message, mergedParams.messageArgs)}
        </Alert>
      );
    }
    return undefined;
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: mergedParams.vertical,
        horizontal: mergedParams.horizontal,
      }}
      message={
        mergedParams.message ? translate(mergedParams.message, mergedParams.messageArgs) : null
      }
      open={open}
      autoHideDuration={mergedParams.autoHideDuration}
      disableWindowBlurListener={mergedParams.undoable}
      TransitionProps={{ onExited: handleExited }}
      onClose={handleRequestClose}
      ContentProps={{
        sx: {
          whiteSpace: 'pre-wrap',
        },
        className: classnames(className),
      }}
      action={renderAction()}
      ref={ref}
      {...rest}
    >
      {renderChild()}
    </Snackbar>
  );
});

AsNoti.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  autoHideDuration: PropTypes.number,
  multiLine: PropTypes.bool,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};

AsNoti.defaultProps = {
  type: 'info',
  autoHideDuration: 5000,
  multiLine: false,
  vertical: 'bottom',
  horizontal: 'right',
};

AsNoti.displayName = 'AsNoti';
