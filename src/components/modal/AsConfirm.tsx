import React, {
  forwardRef,
  useEffect,
  useCallback,
  useState,
  HTMLAttributes,
  ElementType,
  ReactNode,
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import lodIsEmpty from 'lodash/isEmpty';
import lodMerge from 'lodash/merge';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import classnames from 'classnames';

import { useTranslate, CoreState } from '@as/ui-react-core';

export interface AsConfirmProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Make sidebar narrow.
   */
  confirmLabel?: string;
  /**
   * Callback fired when the component requests to be hidden.
   */
  ConfirmIcon?: string | ElementType;
  /**
   * Callback fired when the component requests to be shown.
   */
  ConfirmButtonProps?: object;
  /**
   * Event emitted after visibility of component changed.
   */
  onConfirm?: () => void;
  /**
   * Set sidebar to overlaid variant.
   */
  cancelLabel?: string;
  /**
   * Place sidebar in non-static positions.
   */
  CancelIcon?: string | ElementType;
  /**
   * Expand narrowed sidebar on hover.
   */
  CancelButtonProps?: object;
  /**
   * Toggle the visibility of sidebar component.
   */
  onCancel?: () => void;
  /**
   * Place sidebar in non-static positions.
   */
  content?: string | ElementType | ReactNode;
  /**
   * Set sidebar to overlaid variant.
   */
  title?: string;
  /**
   * Expand narrowed sidebar on hover.
   */
  translateOptions?: object;
  /**
   * Set sidebar to overlaid variant.
   */
  isLoading?: boolean;
}

export const AsConfirm = forwardRef<HTMLDivElement, AsConfirmProps>((props, ref) => {
  const {
    className,
    confirmLabel,
    ConfirmButtonProps,
    ConfirmIcon,
    onConfirm,
    cancelLabel,
    CancelIcon,
    CancelButtonProps,
    onCancel,
    content,
    title,
    translateOptions,
    isLoading,
  } = props;
  const [open, setOpen] = useState(false);
  const [mergedParams, setMergedParams] = useState<any>({
    className,
    confirmLabel,
    ConfirmIcon,
    ConfirmButtonProps,
    onConfirm,
    cancelLabel,
    CancelButtonProps,
    CancelIcon,
    onCancel,
    content,
    title,
    translateOptions,
    isLoading,
  });
  const confirm = useSelector((state: CoreState) => state.core.confirm);
  const isLoadingRd = useSelector((state: CoreState) => state.auth.isLoading);
  const translate = useTranslate();

  useEffect(() => {
    if (!lodIsEmpty(confirm)) {
      setMergedParams(lodMerge({}, props, confirm));
    }
    setOpen(!lodIsEmpty(confirm));
  }, [confirm]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConfirm = useCallback(
    (evt) => {
      evt.stopPropagation();
      if (mergedParams && mergedParams.onConfirm) {
        mergedParams.onConfirm();
      }
    },
    [mergedParams.onConfirm] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {open && (
        <Dialog
          open={open}
          onClose={mergedParams.onCancel}
          onClick={handleClick}
          aria-labelledby="alert-dialog-title"
          className={classnames(mergedParams.className)}
          ref={ref}
        >
          <DialogTitle id="alert-dialog-title">
            {translate(mergedParams.title, { ...mergedParams.translateOptions })}
          </DialogTitle>
          <DialogContent>
            {typeof mergedParams.content === 'string' ? (
              <DialogContentText>
                {translate(mergedParams.content, {
                  ...mergedParams.translateOptions,
                })}
              </DialogContentText>
            ) : (
              mergedParams.content
            )}
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isLoadingRd || isLoading}
              onClick={mergedParams.onCancel}
              startIcon={<mergedParams.CancelIcon />}
              autoFocus
              {...CancelButtonProps}
            >
              {translate(mergedParams.cancelLabel)}
            </Button>
            <Button
              disabled={isLoadingRd || isLoading}
              onClick={handleConfirm}
              startIcon={<mergedParams.ConfirmIcon />}
              {...ConfirmButtonProps}
            >
              {translate(mergedParams.confirmLabel)}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
});

AsConfirm.propTypes = {
  className: PropTypes.string,
  confirmLabel: PropTypes.string,
  ConfirmIcon: PropTypes.elementType,
  ConfirmButtonProps: PropTypes.objectOf(PropTypes.any),
  onConfirm: PropTypes.func,
  cancelLabel: PropTypes.string,
  CancelIcon: PropTypes.elementType,
  CancelButtonProps: PropTypes.objectOf(PropTypes.any),
  onCancel: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
  title: PropTypes.string,
  translateOptions: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
};

AsConfirm.defaultProps = {
  confirmLabel: 'app.actions.confirm',
  ConfirmIcon: MdCheckCircle,
  ConfirmButtonProps: {},
  onConfirm: () => {},
  cancelLabel: 'app.actions.cancel',
  CancelIcon: MdErrorOutline,
  CancelButtonProps: {},
  onCancel: () => {},
  content: '',
  isLoading: false,
};

AsConfirm.displayName = 'AsConfirm';
