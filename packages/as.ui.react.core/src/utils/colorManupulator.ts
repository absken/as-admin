import getCssCustomProperties from './getCssCustomProperties';

const minIEVersion = 10;
// @ts-ignore
const isIE1x = () => Boolean(document.documentMode) && document.documentMode >= minIEVersion;
const isCustomProperty = (property: string) => property.match(/^--.*/i);

const getStyle = (property: string, element = document.body) => {
  let style;

  if (isCustomProperty(property) && isIE1x()) {
    const cssCustomProperties = getCssCustomProperties();
    style = cssCustomProperties[property];
  } else {
    style = window.getComputedStyle(element, null).getPropertyValue(property).replace(/^\s/, '');
  }

  return style;
};

const getColor = (rawProperty: string, element = document.body) => {
  const property = `--${rawProperty}`;
  const style = getStyle(property, element);
  return style ? style : rawProperty;
};

/* eslint-disable no-magic-numbers */
const hexToRgb = (color: any) => {
  if (typeof color === 'undefined') {
    throw new TypeError('Hex color is not defined');
  }

  const hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

  if (!hex) {
    throw new Error(`${color} is not a valid hex color`);
  }

  let r;
  let g;
  let b;

  if (color.length === 7) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else {
    r = parseInt(color.slice(1, 2), 16);
    g = parseInt(color.slice(2, 3), 16);
    b = parseInt(color.slice(3, 5), 16);
  }

  return `rgba(${r}, ${g}, ${b})`;
};

/* eslint-disable no-magic-numbers */
const hexToRgba = (color: any, opacity = 100) => {
  if (typeof color === 'undefined') {
    throw new TypeError('Hex color is not defined');
  }

  const hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

  if (!hex) {
    throw new Error(`${color} is not a valid hex color`);
  }

  let r;
  let g;
  let b;

  if (color.length === 7) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else {
    r = parseInt(color.slice(1, 2), 16);
    g = parseInt(color.slice(2, 3), 16);
    b = parseInt(color.slice(3, 5), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

/* eslint-disable no-magic-numbers */
const rgbToHex = (color: any) => {
  if (typeof color === 'undefined') {
    throw new TypeError('Hex color is not defined');
  }

  if (color === 'transparent') {
    return '#00000000';
  }

  const rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

  if (!rgb) {
    throw new Error(`${color} is not a valid rgb color`);
  }

  const r = `0${parseInt(rgb[1], 10).toString(16)}`;
  const g = `0${parseInt(rgb[2], 10).toString(16)}`;
  const b = `0${parseInt(rgb[3], 10).toString(16)}`;

  return `#${r.slice(-2)}${g.slice(-2)}${b.slice(-2)}`;
};

const darken = (color: any, coefficient: number) => {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(color);
};

export { getColor, getStyle, hexToRgb, hexToRgba, rgbToHex, darken };

function decomposeColor(color: any): any {
  // Idempotent
  if (color.type) {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(
      `Unsupported \`${color}\` color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
    );
  }

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].substr(1);
    }

    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
      throw new Error(
        `Unsupported \`${colorSpace}\` color space. The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
      );
    }
  } else {
    values = values.split(',');
  }

  values = values.map((value: string) => parseFloat(value));
  return {
    type,
    values,
    colorSpace,
  };
}

function recomposeColor(color: any) {
  const { type, colorSpace } = color;
  let { values } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n: any, i: number) => (i < 3 ? parseInt(n, 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}

function clamp(value: any, min = 0, max = 1) {
  if (value < min || value > max) {
    console.error(`The value provided ${value} is out of range [${min}, ${max}].`);
  }

  return Math.min(Math.max(min, value), max);
}
