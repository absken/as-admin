import * as UiActions from './ui.action';

export interface UiState {
  pageTitle: string;
  refreshVersion: number;
  customMessage: string;
}

const initialState: UiState = {
  pageTitle: '',
  refreshVersion: 0,
  customMessage: '',
};

const uiReducer = (state: UiState = initialState, action: UiActions.UiActionTypes): UiState => {
  switch (action.type) {
    case UiActions.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload.pageTitle,
      };

    case UiActions.REFRESH_PAGE:
      return {
        ...state,
        refreshVersion: state.refreshVersion + 1,
      };

    case UiActions.SET_CUSTOM_MESSAGE:
      return {
        ...state,
        customMessage: action.payload && action.payload.message,
      };

    default:
      return state;
  }
};

export default uiReducer;

///////////////////////////////////////////////////////////////////////////
// Type
///////////////////////////////////////////////////////////////////////////
