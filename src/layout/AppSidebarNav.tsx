import React, { useState, useEffect, FC } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Transition } from 'react-transition-group';
import lodFind from 'lodash/find';
import classNames from 'classnames';
import { useTranslate, useNavVisibleInfo } from '@as/ui-react-core';
import {
  AsSidebarVisibleGroup,
  AsSidebarVisibleGroupItem,
  AsSidebarDivider,
  AsSidebarNavItem,
} from '../components';

import { NavItem } from '../nav';
import { ReactIcon } from '../types';

export interface AppSidebarNavProps {
  items: any;
}

function AppSidebarNav(props: AppSidebarNavProps) {
  const { items } = props;

  const history = useHistory();
  const translate = useTranslate();
  const { navActiveKey, setNavActiveKey, navVisibleGroup, setNavVisibleGroup } =
    useNavVisibleInfo();

  const [subItems, setSubItems] = useState<any[]>([]);
  const [forceRemoveActive, setForceRemoveActive] = useState(false);

  // set subItems
  useEffect(() => {
    if (navVisibleGroup) {
      const targetItem = lodFind(items, { visibleGroup: navVisibleGroup });
      if (targetItem && targetItem.items) {
        setSubItems([...targetItem.items]);
      }
    } else {
      setSubItems([]);
    }
  }, [navVisibleGroup, items]);

  const navLinkItem = (
    name: string,
    icon?: ReactIcon,
    badge?: any,
    hasSubItems: boolean = false
  ) => {
    return (
      <>
        {icon && icon}
        {name && translate(name)}
        {badge && (
          <Chip
            size="small"
            color={badge.color}
            label={badge.text}
            className="ml-auto rounded-md font-bold p-0 h-5"
          />
        )}
        {hasSubItems && (
          <BsFillArrowRightCircleFill className="ml-auto text-gray-500" size="1.2em" />
        )}
      </>
    );
  };

  const navItem = (
    item: NavItem,
    index: number,
    isSubItem: boolean,
    navVG: string,
    forceRA: boolean
  ) => {
    const { component, name, badge, icon, visibleGroup, autoInitPage, ...rest } = item;
    const Component = component as FC;
    const hasSubItems = !!item.items;

    if (hasSubItems && !visibleGroup) {
      console.warn('Must define visibleGroup to display SubNavItems');
    }

    const classNameNavGroupItem = classNames('cursor-pointer', {
      active: navVG && navVG === visibleGroup,
    });

    return (
      <Component
        {...(rest.to &&
          !hasSubItems && {
            component: NavLink,
            activeClassName: forceRA ? 'no-class' : 'active',
            onClick: () => {
              setForceRemoveActive(false);
            },
          })}
        {...(hasSubItems && {
          className: classNameNavGroupItem,
          onClick: () => {
            handleToggleButton(2, item);
          },
        })}
        {...(isSubItem && {
          className: 'nav-item-sub',
        })}
        key={index}
        {...rest}
      >
        {navLinkItem(name, icon, badge, !!item.items)}
      </Component>
    );
  };

  const handleToggleButton = (activeKey: string | number, item: NavItem) => {
    if (item.autoInitPage) {
      const firstInitNavItem: NavItem | undefined = lodFind(item.items, (o) => {
        return !!o.to;
      });
      if (firstInitNavItem) {
        history.push(firstInitNavItem.to as string);
      }
    } else {
      setNavVisibleGroup(item.visibleGroup);
      setNavActiveKey(2);
      setForceRemoveActive(true);
    }
  };

  const duration = 200;
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
  };

  const transitionStyles1 = {
    entering: { display: 'block', transform: 'translateX(-100%)' },
    entered: { display: 'block', transform: 'translateX(0)' },
    exiting: { display: 'block', transform: 'translateX(-100%)' },
    exited: { display: 'none' },
  };

  const transitionStyles2 = {
    entering: { display: 'block', transform: 'translateX(100%)' },
    entered: { display: 'block', transform: 'translateX(0)' },
    exiting: { display: 'block', transform: 'translateX(100%)' },
    exited: { display: 'none' },
  };

  return (
    <AsSidebarVisibleGroup>
      <Transition in={navActiveKey === 1} timeout={{ enter: 0, exit: duration }}>
        {(state) => (
          <AsSidebarVisibleGroupItem
            style={{
              ...defaultStyle,
              ...transitionStyles1[state as 'entering' | 'entered' | 'exiting' | 'exited'],
            }}
          >
            {items &&
              items.map((item: NavItem, index: number) =>
                navItem(item, index, false, navVisibleGroup, forceRemoveActive)
              )}
          </AsSidebarVisibleGroupItem>
        )}
      </Transition>
      <Transition in={navActiveKey === 2} timeout={{ enter: 0, exit: duration }}>
        {(state) => (
          <AsSidebarVisibleGroupItem
            style={{
              ...defaultStyle,
              ...transitionStyles2[state as 'entering' | 'entered' | 'exiting' | 'exited'],
            }}
          >
            <AsSidebarNavItem
              to="/back-to-main"
              className="cursor-pointer mb-1 text-base text-gray-900"
              onClick={() => {
                setNavActiveKey(1);
              }}
            >
              <BsFillArrowLeftCircleFill className="nav-icon text-gray-500" size="1.0em" />
              Back to main
            </AsSidebarNavItem>
            <AsSidebarDivider />
            {subItems.map((subItem, index) => navItem(subItem, index, true, '', false))}
          </AsSidebarVisibleGroupItem>
        )}
      </Transition>
    </AsSidebarVisibleGroup>
  );
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppSidebarNav;
