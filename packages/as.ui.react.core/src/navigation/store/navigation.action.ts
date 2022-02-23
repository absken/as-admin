export const SET_NAV_VISIBLE_GROUP = '[Core/Ui] Set Navigation Visible Group';
export const SET_NAV_ACTIVE_KEY = '[Core/Ui] Set Navigation Active Key';

export interface SetNavVisibleGroupAction {
  readonly type: typeof SET_NAV_VISIBLE_GROUP;
  readonly payload: any;
}

export interface SetNavActiveKeyAction {
  readonly type: typeof SET_NAV_ACTIVE_KEY;
  readonly payload: any;
}

export type NavigationActionTypes = SetNavVisibleGroupAction | SetNavActiveKeyAction;

export const setNavVisibleGroupAction = (navVisibleGroup: string) => ({
  type: SET_NAV_VISIBLE_GROUP,
  payload: { navVisibleGroup },
});

export const setNavActiveKeyAction = (navActiveKey: number) => ({
  type: SET_NAV_ACTIVE_KEY,
  payload: { navActiveKey },
});

///////////////////////////////////////////////////////////////////////////
// Side effects
///////////////////////////////////////////////////////////////////////////
// Add if there is any
