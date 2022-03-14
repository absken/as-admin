import { Dispatch } from 'react';
import { RESET_RESOURCES } from '../../store/resources/resources.action';

export const SET_UI = '[Layout] Set UI';

export interface ResetResourcesAction {
  readonly type: typeof SET_UI;
  readonly payload: any;
}

const setUIAction = (payload: any) => ({
  type: SET_UI,
  payload,
});

//------------------------------------------------------------------------
// Side effects
//------------------------------------------------------------------------
export const setUI = (payload: any) => (dispatch: Dispatch<any>) => {
  dispatch(setUIAction(payload));
};
