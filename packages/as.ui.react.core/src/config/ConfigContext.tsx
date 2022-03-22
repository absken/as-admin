import { createContext } from 'react';
import defaultConfig from './defaultConfig';

const ConfigContext = createContext(defaultConfig);

ConfigContext.displayName = 'ConfigContext';

export default ConfigContext;
