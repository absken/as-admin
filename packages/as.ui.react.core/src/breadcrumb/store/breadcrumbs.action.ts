export const RESET_BREADCRUMB = '[Core/Breadcrumbs] Reset Breadcrumb';
export const ADD_BREADCRUMB = '[Core/Breadcrumbs] Add Breadcrumb';
export const SET_BREADCRUMB = '[Core/Breadcrumbs] Set Breadcrumb';

export interface ResetBreadcrumbAction {
  readonly type: typeof RESET_BREADCRUMB;
}

export interface AddBreadcrumbAction {
  readonly type: typeof ADD_BREADCRUMB;
  readonly payload: any;
}

export interface SetBreadcrumbAction {
  readonly type: typeof SET_BREADCRUMB;
  readonly payload: any;
}

export type BreadcrumbActionTypes =
  | ResetBreadcrumbAction
  | AddBreadcrumbAction
  | SetBreadcrumbAction;

export const resetBreadcrumbAction = () => ({
  type: RESET_BREADCRUMB,
});

export const addBreadcrumbAction = (route: any) => ({
  type: ADD_BREADCRUMB,
  payload: { route },
});

export const setBreadcrumbAction = (route: any) => ({
  type: SET_BREADCRUMB,
  payload: { route },
});

// /////////////////////////////////////////////////////////////////////////
// Side effects
// /////////////////////////////////////////////////////////////////////////
// Add if there is any
