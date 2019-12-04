import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
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

function LocaleProvider({ children, locale = defaultLocale.path, location }) {
  const [savedLocale, saveLocale] = useLocalStorage(
    'graphcms-swag-store',
    JSON.stringify({
      activeLocale: locale,
    })
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedLocale));

  const updateLocale = useCallback(
    locale => {
      dispatch({ type: 'UPDATE_LOCALE', locale });

      const path = location.pathname.substring(4);

      navigate(`/${locale.toLowerCase()}/${path}`);
    },
    [location.pathname]
  );

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
