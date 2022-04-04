export const START_APP_LOADING = '[Core/Loading] Start App Loading';
export const STOP_APP_LOADING = '[Core/Loading] Stop App Loading';

export interface StartAppLoadingAction {
  readonly type: typeof START_APP_LOADING;
}

export interface StopAppLoadingAction {
  readonly type: typeof STOP_APP_LOADING;
}

export type LoadingActionTypes = StartAppLoadingAction | StopAppLoadingAction;

export const startAppLoadingAction = () => ({
  type: START_APP_LOADING,
});

export const stopAppLoadingAction = () => ({
  type: STOP_APP_LOADING,
});

// /////////////////////////////////////////////////////////////////////////
// Side effects
// /////////////////////////////////////////////////////////////////////////
// Add if there is any
