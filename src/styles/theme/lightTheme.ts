import { buttonClasses } from '@mui/material/Button';
import { utils } from '@as/ui-react-core';

const lightTheme: any = {
  palette: {},
  breakpoints: {
    values: {
      xs: 'var(--as-breakpoint-xs)',
      sm: 'var(--as-breakpoint-sm)',
      md: 'var(--as-breakpoint-md)',
      lg: 'var(--as-breakpoint-lg)',
      xl: 'var(--as-breakpoint-xl)',
      xxl: 'var(--as-breakpoint-xxl)',
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
