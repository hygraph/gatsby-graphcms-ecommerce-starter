import React, { useContext } from 'react';
import { Link } from 'gatsby';

import LocaleContext from '../context/Locale';
import locales from '../../config/locales';

function LocaleLink({ children, props, to }) {
  const { activeLocale } = useContext(LocaleContext);

  const currentLocale = locales.find(({ path }) => path === activeLocale);

  const path = currentLocale.default
    ? to
    : `/${currentLocale.path.toLowerCase()}${to}`;

  return (
    <Link {...props} to={path}>
      {children}
    </Link>
  );
}

export default LocaleLink;
