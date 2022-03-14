import * as LayoutActions from './layout.action';

export type LayoutState = {
  sidebarShow: boolean;
  sidebarEndShow: boolean;
  sidebarUnfoldable: boolean;
};

const initialState = {
  sidebarShow: true,
  sidebarEndShow: false,
  sidebarUnfoldable: false,
};

export function layout(
  state: LayoutState = initialState,
  action: LayoutActions.ResetResourcesAction
) {
  switch (action.type) {
    case LayoutActions.SET_UI:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
