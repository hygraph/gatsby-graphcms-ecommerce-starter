import React, { useContext } from 'react';
import { Link } from 'gatsby';

import LocaleContext from '../context/Locale';

function LocaleLink({ children, to, ...props }) {
  const { activeLocale } = useContext(LocaleContext);

  return (
    <Link {...props} to={`/${activeLocale.toLowerCase()}${to}`}>
      {children}
    </Link>
  );
}

export default LocaleLink;
