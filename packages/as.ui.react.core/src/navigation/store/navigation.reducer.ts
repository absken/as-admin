import * as NavigationActions from './navigation.action';

export interface NavigationState {
  navVisibleGroup: string;
  navActiveKey: number;
}

const initialState: NavigationState = {
  navVisibleGroup: '',
  navActiveKey: 1,
};

const navigationReducer = (
  state: NavigationState = initialState,
  action: NavigationActions.NavigationActionTypes
) => {
  switch (action.type) {
    case NavigationActions.SET_NAV_VISIBLE_GROUP:
      return {
        ...state,
        navVisibleGroup: action.payload.navVisibleGroup,
      };

    case NavigationActions.SET_NAV_ACTIVE_KEY:
      return {
        ...state,
        navActiveKey: action.payload.navActiveKey,
      };

    default:
      return state;
  }
};

export default navigationReducer;
