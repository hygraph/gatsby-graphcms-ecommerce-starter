import React from 'react';

import { LocaleProvider } from '../context/Locale';

import '../styles/main.css';

import Header from './Header';
import Footer from './Footer';

function Layout({ children, location, pageContext: { locale } }) {
  return (
    <React.Fragment>
      <LocaleProvider locale={locale} location={location}>
        <Header />
        <div className="container mx-auto px-6 py-12">{children}</div>
        <Footer />
      </LocaleProvider>
    </React.Fragment>
  );
}

export default Layout;
