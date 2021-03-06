/**
 * --------------------------------------------------------------------------
 * @returns {string} css custom property name
 * --------------------------------------------------------------------------
 */
const getCssCustomProperties = (): any => {
  const cssCustomProperties = {};
  const sheets = document.styleSheets;
  let cssText = '';
  for (let i = sheets.length - 1; i > -1; i -= 1) {
    const rules = sheets[i].cssRules;
    for (let j = rules.length - 1; j > -1; j -= 1) {
      // @ts-ignore
      if (rules[j].selectorText === '.ie-custom-properties') {
        // eslint-disable-next-line prefer-destructuring
        cssText = rules[j].cssText;
        break;
      }
    }

    if (cssText) {
      break;
    }
  }

  cssText = cssText.substring(cssText.lastIndexOf('{') + 1, cssText.lastIndexOf('}'));

  cssText.split(';').forEach((property) => {
    if (property) {
      const name = property.split(': ')[0];
      const value = property.split(': ')[1];
      if (name && value) {
        // @ts-ignore
        cssCustomProperties[`--${name.trim()}`] = value.trim();
      }
    }
  });
  return cssCustomProperties;
};

export default getCssCustomProperties;
