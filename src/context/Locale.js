import React, { createContext, useEffect, useReducer } from 'react';

const LocaleContext = createContext();

function reducer(state, { type, locale }) {
  switch (type) {
    case 'UPDATE_LOCALE':
      return { ...state, activeLocale: locale };
    default:
      throw new Error('Invalid action');
  }
}

function LocaleProvider({ children, locale = 'en' }) {
  const [state, dispatch] = useReducer(reducer, { activeLocale: 'en' });

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
