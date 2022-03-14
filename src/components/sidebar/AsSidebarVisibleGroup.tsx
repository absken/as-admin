import React, { forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface AsSidebarVisibleGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
}

export const AsSidebarVisibleGroup = forwardRef<HTMLDivElement, AsSidebarVisibleGroupProps>(
  ({ children, className, ...rest }, ref) => {
    const classNameInner = classNames('relative w-full overflow-hidden', className);
    return (
      <div className={classNameInner} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

AsSidebarVisibleGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AsSidebarVisibleGroup.displayName = 'AsSidebarVisibleGroup';
