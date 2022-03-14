import React, { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { utils } from '@as/ui-react-core';

export interface AsSidebarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Make sidebar narrow.
   */
  narrow?: boolean;
  /**
   * Callback fired when the component requests to be hidden.
   */
  onHide?: () => void;
  /**
   * Callback fired when the component requests to be shown.
   */
  onShow?: () => void;
  /**
   * Event emitted after visibility of component changed.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Set sidebar to overlaid variant.
   */
  overlaid?: boolean;
  /**
   * Place sidebar in non-static positions.
   */
  position?: 'fixed' | 'sticky' | 'end';
  /**
   * Expand narrowed sidebar on hover.
   */
  unfoldable?: boolean;
  /**
   * Toggle the visibility of sidebar component.
   */
  visible?: boolean;
}

const isOnMobile = (element: HTMLDivElement) =>
  Boolean(getComputedStyle(element).getPropertyValue('--as-is-mobile'));

const isVisible = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const AsSidebar = forwardRef<HTMLDivElement, AsSidebarProps>(
  (
    {
      children,
      className,
      narrow,
      onHide,
      onShow,
      onVisibleChange,
      overlaid,
      position,
      unfoldable,
      visible,
      ...rest
    },
    ref
  ) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const forkedRef = utils.useForkedRef(ref, sidebarRef);
    const [mobile, setMobile] = useState(false);
    const [visibleInner, setVisible] = useState(visible);
    const [inViewport, setInViewport] = useState<boolean>();

    useEffect(() => {
      sidebarRef.current && setMobile(isOnMobile(sidebarRef.current));
      setVisible(visible);
    }, [visible]);

    useEffect(() => {
      typeof inViewport !== 'undefined' && onVisibleChange && onVisibleChange(inViewport);
      !inViewport && onHide && onHide();
      inViewport && onShow && onShow();
    }, [inViewport]);

    useEffect(() => {
      mobile && visible && setVisible(false);
    }, [mobile]);

    useEffect(() => {
      sidebarRef.current && setMobile(isOnMobile(sidebarRef.current));
      sidebarRef.current && setInViewport(isVisible(sidebarRef.current));

      window.addEventListener('resize', () => handleResize());
      window.addEventListener('mouseup', handleClickOutside);
      window.addEventListener('keyup', handleKeyup);

      sidebarRef.current?.addEventListener('mouseup', handleOnClick);
      sidebarRef.current?.addEventListener('transitionend', () => {
        sidebarRef.current && setInViewport(isVisible(sidebarRef.current));
      });

      return () => {
        window.removeEventListener('resize', () => handleResize());
        window.removeEventListener('mouseup', handleClickOutside);
        window.removeEventListener('keyup', handleKeyup);

        sidebarRef.current?.removeEventListener('mouseup', handleOnClick);
        sidebarRef.current?.removeEventListener('transitionend', () => {
          sidebarRef.current && setInViewport(isVisible(sidebarRef.current));
        });
      };
    });

    const handleHide = () => {
      setVisible(false);
    };

    const handleResize = () => {
      sidebarRef.current && setMobile(isOnMobile(sidebarRef.current));
      sidebarRef.current && setInViewport(isVisible(sidebarRef.current));
    };

    const handleKeyup = (event: Event) => {
      if (
        mobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as HTMLElement)
      ) {
        handleHide();
      }
    };
    const handleClickOutside = (event: Event) => {
      if (
        mobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as HTMLElement)
      ) {
        handleHide();
      }
    };

    const handleOnClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      target &&
        target.classList.contains('nav-link') &&
        !target.classList.contains('nav-group-toggle') &&
        mobile &&
        handleHide();
    };

    const classNameSidebar = classNames(
      'sidebar flex flex-col h-full shrink-0 transition-all duration-150',
      {
        'fixed z-20 top-0 left-0 pt-14 w-64': position !== 'end',
      },
      {
        'sidebar-narrow': narrow,
        'sidebar-overlaid': overlaid,
        [`sidebar-${position}`]: position,
        'sidebar-narrow-unfoldable': unfoldable,
        show: visibleInner === true,
        hide: visibleInner === false,
      },
      className
    );

    const classNameBackdrop = classNames('bg-gray-900 opacity-50 fixed inset-0 z-10', {
      fixed: visibleInner === true,
      hidden: visibleInner === false,
    });

    return (
      <>
        <div className={classNameSidebar} {...rest} ref={forkedRef}>
          {children}
        </div>
        {typeof window !== 'undefined' && mobile && (
          <div className={classNameBackdrop} aria-hidden="true" />
        )}
      </>
    );
  }
);

AsSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  narrow: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  onVisibleChange: PropTypes.func,
  overlaid: PropTypes.bool,
  position: PropTypes.oneOf(['fixed', 'sticky', 'end']),
  unfoldable: PropTypes.bool,
  visible: PropTypes.bool,
};

AsSidebar.displayName = 'AsSidebar';
