import React, { forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface AsSidebarVisibleGroupItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
}

export const AsSidebarVisibleGroupItem = forwardRef<HTMLDivElement, AsSidebarVisibleGroupItemProps>(
  ({ children, className, ...rest }, ref) => {
    const classNameInner = classNames('relative hidden float-left w-full mr-[-100%]', className);
    return (
      <div className={classNameInner} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

AsSidebarVisibleGroupItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AsSidebarVisibleGroupItem.displayName = 'AsSidebarVisibleGroupItem';
