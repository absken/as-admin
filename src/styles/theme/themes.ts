import lodFind from 'lodash/find';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

const themes = [
  {
    name: 'light',
    theme: lightTheme,
  },
  {
    name: 'dark',
    theme: darkTheme,
  },
];

export default themes;

const getAppTheme = (themeType: string): any => {
  const theme = lodFind(themes, { name: themeType });

  if (theme) {
    return theme.theme;
  }
  return themes[0].theme;
};

export { getAppTheme };
