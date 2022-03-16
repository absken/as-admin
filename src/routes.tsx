import React from 'react';

const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'));
// Workflows
const WorkflowList = React.lazy(() => import('./features/workflows/WorkflowList'));
// Base
const BaseFirstMenu = React.lazy(() => import('./features/base/BaseFirstMenu'));
// Counter
const Counter = React.lazy(() => import('./features/counter/Counter'));

export const homeRoute = {
  path: '/',
  name: 'Dashboard',
  component: Dashboard,
  exact: true,
  actualPath: '/dashboard',
};

const routes = [
  { path: '/dashboard', name: 'app.demo.dashboard.name', component: Dashboard },
  { path: '/workflows', name: 'app.demo.dashboard.name', component: WorkflowList },
  { path: '/base', name: 'Base', component: BaseFirstMenu, exact: true },
  { path: '/base/first-menu', name: 'Base First Menu', component: BaseFirstMenu },
  { path: '/counter', name: 'app.demo.dashboard.name', component: Counter },
];

export default routes;
