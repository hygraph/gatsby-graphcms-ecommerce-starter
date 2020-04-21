import React, { createContext, useEffect, useReducer } from 'react';
import { navigate } from '@reach/router';

import locales from '../../config/locales';
import useLocalStorage from '../hooks/useLocalStorage';

const LocaleContext = createContext();

function reducer(state, { type, locale }) {
  switch (type) {
    case 'UPDATE_LOCALE':
      return { ...state, activeLocale: locale };
    default:
      throw new Error('Invalid action');
  }
}

const defaultLocale = locales.find(locale => locale.default);

function LocaleProvider({
  children,
  locale = defaultLocale.path,
  location: { pathname, search },
}) {
  const [savedLocale, saveLocale] = useLocalStorage(
    'graphcms-swag-store',
    JSON.stringify({
      activeLocale: locale,
    })
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedLocale));
  const [, localePath] = pathname.split('/');

  const updateLocale = locale =>
    navigate(`/${locale.toLowerCase()}${pathname.substring(3)}${search}`);

  useEffect(() => {
    if (
      localePath !== state.activeLocale &&
      locales.map(({ path }) => path).includes(localePath)
    )
      dispatch({ type: 'UPDATE_LOCALE', locale: localePath });
  }, [localePath, state.activeLocale]);

  useEffect(() => {
    saveLocale(JSON.stringify(state));
  }, [state, saveLocale]);

  return (
    <LocaleContext.Provider
      value={{
        ...state,
        updateLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export { LocaleProvider, LocaleContext as default };
