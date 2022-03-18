import { buttonClasses } from '@mui/material/Button';
import { utils } from '@as/ui-react-core';

const lightTheme: any = {
  palette: {
    primary: {
      main: utils.getStyle('--as-primary'),
    },
    secondary: {
      main: utils.getStyle('--as-secondary'),
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.${buttonClasses.disabled}`]: {
            opacity: 0.5,
          },
        },
      },
    },
  },
};

export default lightTheme;
