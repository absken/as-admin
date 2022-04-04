import * as BreadcrumbsActions from './breadcrumbs.action';

export interface Breadcrumb {
  path?: string;
}

export type BreadcrumbState = Breadcrumb[];

const initialState: BreadcrumbState = [];

const breadcrumbsReducer = (
  state: BreadcrumbState = initialState,
  action: BreadcrumbsActions.BreadcrumbActionTypes
) => {
  let index;
  switch (action.type) {
    case BreadcrumbsActions.RESET_BREADCRUMB:
      return [];

    case BreadcrumbsActions.ADD_BREADCRUMB:
      return [...state, action.payload.route];

    case BreadcrumbsActions.SET_BREADCRUMB:
      index = -1;
      for (let i = 0; i < state.length; i += 1) {
        const routePath = action.payload.route && action.payload.route.path;
        if (state[i].path === routePath) {
          index = i;
          break;
        }
      }

      return state.splice(index);

    default:
      return state;
  }
};

export default breadcrumbsReducer;
