import React, { createContext, useEffect, useReducer } from 'react';

import locales from '../../config/locales';

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

function LocaleProvider({ children, locale = defaultLocale.path }) {
  const [state, dispatch] = useReducer(reducer, { activeLocale: locale });

  useEffect(() => {
    updateLocale(locale);
  }, [locale]);

  function updateLocale(locale) {
    dispatch({ type: 'UPDATE_LOCALE', locale });
  }

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
