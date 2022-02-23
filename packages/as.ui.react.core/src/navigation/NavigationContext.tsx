import { createContext } from 'react';

const NavigationContext = createContext<object[]>([]);

NavigationContext.displayName = 'ConfigContext';

export default NavigationContext;
