import * as LoadingActions from './loading.action';

export type LoadingState = number;

const initialState: LoadingState = 0;

const loadingReducer = (
  state: LoadingState = initialState,
  action: LoadingActions.LoadingActionTypes
) => {
  switch (action.type) {
    case LoadingActions.START_APP_LOADING:
      return state + 1;

    case LoadingActions.STOP_APP_LOADING:
      return Math.max(state - 1, 0);

    default:
      return state;
  }
};

export default loadingReducer;
