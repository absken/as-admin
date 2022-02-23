import { Store } from 'redux';

import { handleFetchError } from '../data';
import { handleEveryLocationChange } from '../navigation';

const coreInterceptor =
  (store: Store<object>) => (next: (action: any) => void) => (action: any) => {
    // Use setTimeout to avoid rendering conflicts using store.dispatch function.

    //--------------------------
    // Handle global error
    // Use setTimeout to avoid rendering conflicts using store.dispatch function.
    //--------------------------
    handleFetchError(store.dispatch, action);

    //-------------------------------
    // Handle every location changes
    //-------------------------------
    handleEveryLocationChange(store.dispatch, action);

    next(action);
  };

export default coreInterceptor;
