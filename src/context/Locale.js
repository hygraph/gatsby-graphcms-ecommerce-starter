import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { navigate } from '@reach/router';

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

function LocaleProvider({ children, locale = defaultLocale.path, location }) {
  const [state, dispatch] = useReducer(reducer, { activeLocale: locale });

  const updateLocale = useCallback(
    locale => {
      if (locale === state.activeLocale) return;

      ['cart'].forEach(key => {
        if (!location.pathname.includes(key)) {
          dispatch({ type: 'UPDATE_LOCALE', locale });

          const [, , resourcePath, identifierPath] = location.pathname.split(
            '/'
          );

          navigate(
            `/${locale.toLowerCase()}${
              resourcePath ? `/${resourcePath}` : '/'
            }${identifierPath ? `/${identifierPath}` : ''}${
              location.search ? `/${location.search}` : ''
            }`
          );
        }
      });
    },
    [location.pathname, location.search]
  );

  useEffect(() => {
    updateLocale(locale);
  }, [locale, updateLocale]);

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
