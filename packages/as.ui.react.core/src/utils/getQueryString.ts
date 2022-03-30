import lodIsEmpty from 'lodash/isEmpty';
import lodIsPlainObject from 'lodash/isPlainObject';

const getQueryString = (param: any) => {
  if (lodIsEmpty(param)) return '';

  return Object.keys(param)
    .map((key) => {
      if (lodIsPlainObject(param[key]) || Array.isArray(param[key])) {
        return encodeURIComponent(key) + '=' + JSON.stringify(param[key]);
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    })
    .join('&');
};

export default getQueryString;
