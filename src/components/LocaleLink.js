import React, { useContext } from 'react';
import { Link } from 'gatsby';

import LocaleContext from '../context/Locale';
import locales from '../../config/locales';

function LocaleLink({ props, to }) {
  const { activeLocale } = useContext(LocaleContext);

  const currentLocale = locales.find(({ path }) => path === activeLocale);

  const path = currentLocale.default ? to : `/${currentLocale.path}${to}`;

  return <Link {...props} to={path} />;
}

export default LocaleLink;
