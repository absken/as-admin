import lodIsEmpty from 'lodash/isEmpty';
// @ts-ignore
import Polyglot from 'node-polyglot';

const getPolygolotI18nProvider = (
  getMessages: (locale: string) => object | Promise<any>,
  initialLocale = 'en',
  polyglotOptions = {}
) => {
  let locale = initialLocale;
  const messages = getMessages(initialLocale);
  if (messages instanceof Promise) {
    throw new Error(
      `The i18nProvider returned a Promise for the messages of the default locale (${initialLocale}). Please update your i18nProvider to return the messages of the default locale in a synchronous way.`
    );
  }
  let polyglot = new Polyglot({
    locale,
    phrases: { ...messages },
    ...polyglotOptions,
  });
  let translate = polyglot.t.bind(polyglot);

  return {
    translate: (key: string, options?: object) => {
      if (lodIsEmpty(polyglot.phrases) || !key) {
        return key;
      } else {
        return translate(key, options);
      }
    },
    changeLocale: (newLocale: string) =>
      // We systematically return a Promise for the messages because
      // getMessages may return a Promise
      Promise.resolve(getMessages(newLocale)).then((messages) => {
        locale = newLocale;
        const newPolyglot = new Polyglot({
          locale: newLocale,
          phrases: { ...messages },
          ...polyglotOptions,
        });
        polyglot = newPolyglot;
        translate = newPolyglot.t.bind(newPolyglot);
      }),
    getLocale: () => locale,
    getPolyglot: () => polyglot,
    clear: () => polyglot.clear(),
    replace: (phrases: object) => polyglot.replace(phrases),
    extend: (phrases: object) => polyglot.extend(phrases),
  };
};

export default getPolygolotI18nProvider;
