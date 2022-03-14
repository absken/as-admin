import captureErrorMessage from './captureErrorMessage';
import { useForkedRef, useSafeSetState, useTimeout } from './hooks';
import { getColor, getStyle, hexToRgb, hexToRgba, rgbToHex, darken } from './colorManupulator';

const utils = {
  captureErrorMessage,
  useForkedRef,
  useSafeSetState,
  useTimeout,
  getColor,
  getStyle,
  hexToRgb,
  hexToRgba,
  rgbToHex,
  darken,
};

export default utils;

export {
  captureErrorMessage,
  useForkedRef,
  useSafeSetState,
  useTimeout,
  getColor,
  getStyle,
  hexToRgb,
  hexToRgba,
  rgbToHex,
  darken,
};
