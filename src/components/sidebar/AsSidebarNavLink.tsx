import React, { ElementType, forwardRef, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { utils } from '@as/ui-react-core';

import { AsSidebarNavContext } from './AsSidebarNav';
import { AsLinkProps, AsLink } from '../link/AsLink';

export interface AsSidebarNavLinkProps extends Omit<AsLinkProps, 'idx'> {
  /**
   * Toggle the active state for the component.
   */
  active?: boolean;
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: string | ElementType;
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean;
  /**
   * @ignore
   */
  idx?: string;
  /**
   * @ignore
   */
  to?: string;
}

export const AsSidebarNavLink = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLLIElement,
  AsSidebarNavLinkProps
>(({ children, className, idx, ...rest }, ref) => {
  const navLinkRef = useRef<HTMLAnchorElement>(null);
  const forkedRef = utils.useForkedRef(ref, navLinkRef);

  const { setVisibleGroup } = useContext(AsSidebarNavContext);
  const classNameInner = classNames(
    'nav-link flex flex-1 items-center p-2 text-base text-gray-600 font-normal whitespace-nowrap hover:bg-active-menu rounded-lg',
    className
  );

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    rest.active = navLinkRef.current?.classList.contains('active');
    idx && rest.active && setVisibleGroup(idx);
  }, [rest.active, className]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AsLink className={classNameInner} {...rest} ref={forkedRef}>
      {children}
    </AsLink>
  );
});

AsSidebarNavLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  idx: PropTypes.string,
};

AsSidebarNavLink.displayName = 'AsSidebarNavLink';
