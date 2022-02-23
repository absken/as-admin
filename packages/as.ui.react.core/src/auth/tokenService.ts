import cookies from 'browser-cookies';
import { defaultConfig } from '../config';

class Token {
  _secondsLeftBeforeSessionTimeout: number;
  _token: string;
  _lastAccessDatetime: Date;
  _timeToLiveSeconds: number;

  constructor(
    token: string = '',
    lastAccessDatetime: Date | undefined = new Date(),
    timeToLiveSeconds: number | undefined = defaultConfig.auth.timeToLiveSeconds
  ) {
    this._secondsLeftBeforeSessionTimeout = defaultConfig.auth.secondsLeftBeforeSessionTimeout;
    this._token = token;
    this._lastAccessDatetime = lastAccessDatetime;
    this._timeToLiveSeconds = timeToLiveSeconds;
  }

  get token() {
    return this._token;
  }

  get tokenExpirationDatetime() {
    try {
      return new Date(this._lastAccessDatetime.getTime() + this._timeToLiveSeconds * 1000);
    } catch (e) {
      return new Date();
    }
  }

  get intervalForAlert() {
    return (
      this.tokenExpirationDatetime.getTime() -
      this._secondsLeftBeforeSessionTimeout * 1000 -
      new Date().getTime()
    );
  }
}

export const setToken = (token = '', timeToLiveSeconds?: number | string | null) => {
  const tokenName = defaultConfig.auth.tokenName;
  timeToLiveSeconds = timeToLiveSeconds ?? defaultConfig.auth.timeToLiveSeconds;

  if (!token) {
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.removeItem(tokenName);
    } catch (err) {
      cookies.erase(tokenName, { path: '/' });
    }
    return;
  }

  // token, lastAccessDatetime, and timeToLiveSeconds datetime combination
  token = token + '|' + new Date().toISOString() + '|' + timeToLiveSeconds;

  // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
  try {
    localStorage.setItem(tokenName, token);
  } catch (err) {
    cookies.set(tokenName, token, { path: '/' });
  }
};

export const getToken = (): any => {
  const tokenName = defaultConfig.auth.tokenName;
  let token;

  try {
    token = localStorage.getItem(tokenName) || '';
  } catch (e) {
    token = cookies.get(tokenName) || '';
  }

  const splitToken: any[] = token.split('|');

  if (!splitToken) return null;

  return new Token(
    splitToken.length >= 1 ? splitToken[0] : '',
    splitToken.length >= 2 ? new Date(splitToken[1]) : undefined,
    splitToken.length >= 3 ? splitToken[2] : undefined
  );
};
