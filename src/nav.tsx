import React, { FC } from 'react';
import {
  BsPieChart,
  BsCalculator,
  BsDroplet,
  BsBell,
  BsPuzzle,
  BsSpeedometer2,
  BsCursor,
  BsCardText,
  BsStar,
} from 'react-icons/bs';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { AsSidebarNavItem, AsSidebarNavTitle } from './components';
import { ReactIcon } from './types';

export interface NavItem {
  component: FC;
  name: string;
  to?: string;
  icon?: ReactIcon;
  badge?: {
    color: string;
    text: string;
  };
  items?: NavItem[];
  visibleGroup?: string;
  autoInitPage?: boolean;
}

const nav = [
  {
    component: AsSidebarNavItem,
    name: 'app.demo.dashboard.name',
    to: '/dashboard',
    icon: <BsSpeedometer2 className="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: AsSidebarNavItem,
    name: 'Workflow Items',
    to: '/workflows',
    icon: <MdOutlineDashboardCustomize className="nav-icon" />,
  },
  {
    component: AsSidebarNavItem,
    name: 'app.demo.base.name',
    to: '/base',
    icon: <BsPuzzle className="nav-icon" />,
    visibleGroup: 'base',
    autoInitPage: true,
    items: [
      {
        component: AsSidebarNavTitle,
        name: 'app.demo.base.name',
      },
      {
        component: AsSidebarNavItem,
        name: 'Base First Menu',
        to: '/base/first-menu',
        icon: <BsCursor className="nav-icon" />,
      },
      {
        component: AsSidebarNavItem,
        name: 'Base Second Menu',
        to: '/base/second-menu',
        icon: <BsCardText className="nav-icon" />,
      },
      {
        component: AsSidebarNavItem,
        name: 'Base Third Menu',
        to: '/base/third-menu',
        icon: <BsStar className="nav-icon" />,
      },
    ],
  },
  {
    component: AsSidebarNavItem,
    name: 'Counter',
    to: '/counter',
    icon: <BsDroplet className="nav-icon" />,
  },
  {
    component: AsSidebarNavTitle,
    name: 'Superuser',
  },
  {
    component: AsSidebarNavItem,
    name: 'First Menu',
    to: '/sfirst-menu',
    icon: <BsCalculator className="nav-icon" />,
  },
  {
    component: AsSidebarNavItem,
    name: 'Second Menu',
    to: '/ssecond-menu',
    icon: <BsBell className="nav-icon" />,
  },
  {
    component: AsSidebarNavItem,
    name: 'Third Menu',
    to: '/sthird-menu',
    icon: <BsPieChart className="nav-icon" />,
  },
];

export default nav;
