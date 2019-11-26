import React from 'react';

import '../styles/main.css';

import Header from './Header';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />

      <div className="container mx-auto px-6 py-12">{children}</div>
    </React.Fragment>
  );
}

export default Layout;
