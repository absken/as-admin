import { combineReducers } from 'redux';

import * as fromLayouts from '../layout/store/layout.reducer';
import * as fromMessageResource from './messageResource/messageResource.reducer';
import * as fromResource from './resource/resource.reducer';
import * as fromResources from './resources/resources.reducer';
import counterReducer from '../features/counter/counterSlice';

const appReducer = {
  layout: fromLayouts.layout,
  messageResource: fromMessageResource.messageResource(null),
  workflows: combineReducers({
    resource: fromResource.resource({ name: 'workflows' }),
    resources: fromResources.resources({ name: 'workflows' }),
  }),

  // This is an example entity using redux/toolkit
  counter: counterReducer,
  // This is an example entity
  customers: combineReducers({
    // //apiUrl/customers/:id
    resource: fromResource.resource({ name: 'customers' }),
    // //apiUrl/customers
    resources: fromResources.resources({ name: 'customers' }),
  }),
};

export default appReducer;
