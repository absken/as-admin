export const SET_PAGE_TITLE = '[Core/Ui] Set Page Title';
export const REFRESH_PAGE = '[Core/Ui] Refresh Page';
export const SET_CUSTOM_MESSAGE = '[Core/Ui] Set Custom Message';
export const SET_THEME_TYPE = '[Core/Ui] Set Theme Type';

export interface SetPageTitleAction {
  readonly type: typeof SET_PAGE_TITLE;
  readonly payload: any;
}

export interface RefreshPageAction {
  readonly type: typeof REFRESH_PAGE;
}

export interface SetCustomMessageAction {
  readonly type: typeof SET_CUSTOM_MESSAGE;
  readonly payload: any;
}

export interface SetThemeTypeAction {
  readonly type: typeof SET_THEME_TYPE;
  readonly payload: string;
}

export type UiActionTypes = SetPageTitleAction | RefreshPageAction | SetCustomMessageAction | SetThemeTypeAction;

export const setPageTitleAction = (pageTitle: string) => ({
  type: SET_PAGE_TITLE,
  payload: { pageTitle },
});

export const refreshPageAction = () => ({
  type: REFRESH_PAGE,
});

export const setCustomMessageAction = (message: string) => ({
  type: SET_CUSTOM_MESSAGE,
  payload: { message },
});

export const setThemeTypeAction = (themeType: string) => ({
  type: SET_THEME_TYPE,
  payload: themeType,
});

///////////////////////////////////////////////////////////////////////////
// Side effects
///////////////////////////////////////////////////////////////////////////
// Add if there is any
