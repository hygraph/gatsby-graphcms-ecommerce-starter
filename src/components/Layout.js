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

        <div className="container mx-auto p-6 md:py-12 lg:py-16">
          {children}
        </div>

        <Footer />
      </LocaleProvider>
    </React.Fragment>
  );
}

export default Layout;
