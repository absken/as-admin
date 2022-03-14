import React, { createContext, forwardRef, HTMLAttributes, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface AsSidebarNavProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
}

interface ContextProps {
  visibleGroup: string;
  setVisibleGroup: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AsSidebarNavContext = createContext({} as ContextProps);

export const AsSidebarNav = forwardRef<HTMLUListElement, AsSidebarNavProps>(
  ({ children, className, ...rest }, ref) => {
    const [visibleGroup, setVisibleGroup] = useState('');
    const asNavContextValues: any = useMemo(
      () => ({
        visibleGroup,
        setVisibleGroup,
      }),
      [visibleGroup]
    );

    const classes = classNames(
      'sidebar-nav relative flex flex-1 flex-col p-0 mb-0 overflow-x-hidden overflow-y-auto border-r border-gray-200 pt-3 pb-3 px-3',
      className
    );
    return (
      <ul className={classes} ref={ref} {...rest}>
        <AsSidebarNavContext.Provider value={asNavContextValues}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              // eslint-disable-next-line react/no-array-index-key
              return React.cloneElement(child, { key: index, idx: `${index}` });
            }
            return null;
          })}
        </AsSidebarNavContext.Provider>
      </ul>
    );
  }
);

AsSidebarNav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AsSidebarNav.displayName = 'AsSidebarNav';
