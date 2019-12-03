import React from 'react';

import { LocaleProvider } from '../context/Locale';

import '../styles/main.css';

import Header from './Header';

function Layout({ children, location, pageContext: { locale } }) {
  return (
    <React.Fragment>
      <LocaleProvider locale={locale} location={location}>
        <Header />
        <div className="container mx-auto px-6 py-12">{children}</div>
      </LocaleProvider>
    </React.Fragment>
  );
}

export default Layout;
