import React from 'react';

import '../styles/main.css';

import Header from './Header';

import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap -mx-6">
          <aside className="px-6 md:w-1/5">
            <Navigation />
          </aside>

          <main className="px-6 md:w-4/5">{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
