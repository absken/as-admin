import { Dispatch } from 'react';

import defaultNavigation from './defaultNavigation';
import { NavigationActions } from '../store';
import { AppNavigation } from '../types';

export const getNavVisibleInfoFromPathname = (pathname: string) => {
  const items: AppNavigation[] = defaultNavigation;
  let matchedVisibleGroup: string | undefined = '';
  let matchedActiveKey = 1;

  if (items) {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in items) {
      const item = items[i];

      if (item.items) {
        if (pathname === item.to) {
          matchedVisibleGroup = item.visibleGroup;
          matchedActiveKey = 1;
          break;
        }
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const j in item.items) {
          const subItem = item.items[j];
          if (subItem.to && pathname.startsWith(subItem.to)) {
            matchedVisibleGroup = item.visibleGroup;
            matchedActiveKey = 2;
            break;
          }
        }
      }
      if (matchedVisibleGroup) {
        break;
      }
    }
  }

  return [matchedActiveKey, matchedVisibleGroup];
};

const handleEveryLocationChange = (dispatch: Dispatch<any>, action: any) => {
  if (action.type && action.type.indexOf('LOCATION_CHANGE') > -1) {
    // help to display sidebar menu
    setTimeout(() => {
      const pathname =
        (action.payload && action.payload.location && action.payload.location.pathname) || '';
      const [matchedActiveKey, matchedGroupKey] = getNavVisibleInfoFromPathname(pathname);

      dispatch(NavigationActions.setNavActiveKeyAction(matchedActiveKey as number));
      dispatch(NavigationActions.setNavVisibleGroupAction(matchedGroupKey as string));
    }, 0);

    // Add here if there is any
  }
};

export default handleEveryLocationChange;
