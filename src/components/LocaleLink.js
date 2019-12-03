import React, { useContext } from 'react';
import { Link } from 'gatsby';

import LocaleContext from '../context/Locale';

function LocaleLink({ children, to, ...props }) {
  const { activeLocale } = useContext(LocaleContext);

  const path = ['cart'].includes(to)
    ? to
    : `/${activeLocale.toLowerCase()}${to}`;

  return (
    <Link {...props} to={path}>
      {children}
    </Link>
  );
}

export default LocaleLink;
