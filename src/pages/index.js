import { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';

import LocaleContext from '../context/Locale';

function IndexPage() {
  const { activeLocale } = useContext(LocaleContext);

  useEffect(() => {
    navigate(`/${activeLocale.toLowerCase()}`);
  });

  return null;
}

export default IndexPage;
