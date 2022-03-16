import { combineReducers } from 'redux';

import * as fromLayouts from '../layout/store/layout.reducer';
import * as fromMessageResource from './messageResource/messageResource.reducer';
import * as fromResource from './resource/resource.reducer';
import * as fromResources from './resources/resources.reducer';
import counterReducer from '../features/counter/counterSlice';

const appReducer = {
  layout: fromLayouts.layout,
  messageResource: fromMessageResource.messageResource(null),

  counter: counterReducer,
  // This is an example entity
  customers: combineReducers({
    // //apiUrl/entityType/:id
    resource: fromResource.resource({ name: 'customers' }),
    // //apiUrl/entityType
    resources: fromResources.resources({ name: 'customers', limit: 0 }),
  }),
};

export default appReducer;
