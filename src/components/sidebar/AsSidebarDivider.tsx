import React, { forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface AsSidebarDividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
}

export const AsSidebarDivider = forwardRef<HTMLDivElement, AsSidebarDividerProps>(
  ({ className, ...rest }, ref) => {
    const classNameDiv = classNames('absolute right-2 left-2 h-[2px] bg-gray-200', className);

    return <div className={classNameDiv} {...rest} ref={ref} />;
  }
);

AsSidebarDivider.propTypes = {
  className: PropTypes.string,
};

AsSidebarDivider.displayName = 'AsSidebarDivider';
