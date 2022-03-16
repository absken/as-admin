import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CoreState } from '@as/ui-react-core';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<CoreState> = useSelector;
