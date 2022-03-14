import React, { forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface AsSidebarNavTitleProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
}

export const AsSidebarNavTitle = forwardRef<HTMLLIElement, AsSidebarNavTitleProps>(
  ({ children, className, ...rest }, ref) => {
    const classNameInner = classNames(
      'nav-title py-3 px-4 mt-4 text-xs font-bold uppercase text-gray-600',
      className
    );
    return (
      <li className={classNameInner} {...rest} ref={ref}>
        {children}
      </li>
    );
  }
);

AsSidebarNavTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AsSidebarNavTitle.displayName = 'AsSidebarNavTitle';
