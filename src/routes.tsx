import React from 'react';

const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'));
// Base
const BaseFirstMenu = React.lazy(() => import('./features/base/BaseFirstMenu'));

export const homeRoute = {
  path: '/',
  name: 'Dashboard',
  component: Dashboard,
  exact: true,
  actualPath: '/dashboard',
};

const routes = [
  { path: '/dashboard', name: 'app.demo.dashboard.name', component: Dashboard },
  { path: '/base', name: 'Base', component: BaseFirstMenu, exact: true },
  { path: '/base/first-menu', name: 'Base First Menu', component: BaseFirstMenu },
];

export default routes;
