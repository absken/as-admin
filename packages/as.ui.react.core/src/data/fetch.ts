import { stringify } from 'query-string';
import lodIsPlainObject from 'lodash/isPlainObject';
import HttpError from './HttpError';
import { setToken, getToken } from '../auth';
import { ApiCallOptions } from '../types';
import { getQueryString } from '../utils';

export const createHeadersFromOptions = (
  method: string | undefined,
  data: any,
  options?: ApiCallOptions
) => {
  const requestHeaders =
    (options && options.headers) ||
    new Headers({
      Accept: 'application/json',
    });

  if (!requestHeaders.has('Content-Type') && !(data && data instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const tokenInfo = getToken();
  if (tokenInfo.token) {
    requestHeaders.append('x-jwt-token', tokenInfo.token);
  }

  return requestHeaders;
};

/**
 * options.query : QueryString
 * ex) { page: 1, limit: 10, } => page=1&limit=10
 *
 * options.fetchOptions : Fetch Options
 * ex) { mode: 'no-cors', cache: 'default' }
 */
export const fetchJson = (url: string, method?: string, data?: any, options?: ApiCallOptions) => {
  const requestHeaders = createHeadersFromOptions(method, data, options);
  const urlObj = new URL(url);
  const queryFromUrl = urlObj.searchParams.toString();

  if (options && options.query && lodIsPlainObject(options.query)) {
    let query = getQueryString(options.query);

    if (query) {
      query = queryFromUrl ? `${queryFromUrl}&${query}` : `?${query}`;
    }
    url = url.split('?')[0] + query;
  }

  let fetchOptions: any = {};
  if (options && options.fetchOptions && lodIsPlainObject(options.fetchOptions)) {
    fetchOptions = { ...options.fetchOptions };
  }
  fetchOptions.headers = requestHeaders;
  fetchOptions.method = method;
  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  return fetch(url, fetchOptions)
    .then((response) => {
      return response.text().then((text) => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
      }));
    })
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (status < 200 || status >= 300) {
        return Promise.reject(new HttpError((json && json.message) || statusText, status, json));
      }

      const token = headers.get('x-jwt-token');
      const timeToLiveSeconds = headers.get('time-to-live-seconds');
      if (token) {
        setToken(token, timeToLiveSeconds);
      }

      return Promise.resolve({ status, headers, body, json });
    })
    .catch((err) => {
      if (err.message) {
        err.message = `Could not connect to API server (${err.message})`;
      }

      if (err instanceof HttpError) {
        return Promise.reject(err);
      }

      return Promise.reject(new HttpError(err && err.message));
    });
};

export const queryParameters = stringify;

const isValidObject = (value: any) => {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
  const isObject = Object.prototype.toString.call(value) === '[object Object]';
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

export const flattenObject = (value: any, path: any = []): any => {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      // @ts-ignore
      ...Object.keys(value).map((key) => flattenObject(value[key], path.concat([key])))
    );
  } else {
    return path.length ? { [path.join('.')]: value } : value;
  }
};
