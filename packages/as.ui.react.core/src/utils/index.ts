import captureErrorMessage from './captureErrorMessage';
import { getColor, getStyle, hexToRgb, hexToRgba, rgbToHex, darken } from './colorManupulator';
import getQueryString from './getQueryString';
import { useForkedRef, useSafeSetState, useTimeout } from './hooks';

const utils = {
  captureErrorMessage,
  getColor,
  getStyle,
  hexToRgb,
  hexToRgba,
  rgbToHex,
  darken,
  getQueryString,
  useForkedRef,
  useSafeSetState,
  useTimeout,
};

export default utils;

export {
  captureErrorMessage,
  getColor,
  getStyle,
  hexToRgb,
  hexToRgba,
  rgbToHex,
  darken,
  getQueryString,
  useForkedRef,
  useSafeSetState,
  useTimeout,
};
