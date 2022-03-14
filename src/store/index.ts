import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { CoreReduxState } from '@as/ui-react-core';
import counterReducer from '../features/counter/counterSlice';
// ------------------------------------

import appReducer from './app.reducer';
import useGetMessageResource from './messageResource/useGetMessageResource';
import useDeleteResource from './resource/useDeleteResource';
import useDeleteResources from './resources/useDeleteResources';

const selectResource = (name: string, state: CoreReduxState) => state[name].resource;
const selectResources = (name: string, state: CoreReduxState) => state[name].resources;

export {
  appReducer,
  useGetMessageResource,
  selectResource,
  selectResources,
  useDeleteResource,
  useDeleteResources,
};
// ------------------------------------

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
