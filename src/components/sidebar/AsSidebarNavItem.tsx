import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AsSidebarNavLink, AsSidebarNavLinkProps } from './AsSidebarNavLink';

export const AsSidebarNavItem = forwardRef<HTMLLIElement, AsSidebarNavLinkProps>(
  ({ children, className, ...rest }, ref) => {
    const classNameInner = classNames('nav-item mt-2', className);
    let newChilren;

    if (rest.href || rest.to) {
      newChilren = (
        <AsSidebarNavLink className={className} {...rest}>
          {children}
        </AsSidebarNavLink>
      );
    }

    if (newChilren) {
      return (
        <li className={classNameInner} ref={ref}>
          {newChilren}
        </li>
      );
    }

    return (
      <li className={classNameInner} ref={ref}>
        {children}
      </li>
    );
  }
);

AsSidebarNavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AsSidebarNavItem.displayName = 'AsSidebarNavItem';
