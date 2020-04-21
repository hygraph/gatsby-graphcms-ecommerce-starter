import React from 'react';

import { LocaleProvider } from '../context/Locale';

import '../styles/main.css';

import Banner from './Banner';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

function Layout({ children, location, pageContext: { locale } }) {
  return (
    <React.Fragment>
      <SEO />
      <LocaleProvider locale={locale} location={location}>
        <Banner />

        <Header {...location} />

        <div className="container mx-auto p-6 md:py-12 lg:py-16">
          {children}
        </div>

        <Footer />
      </LocaleProvider>
    </React.Fragment>
  );
}

export default Layout;
