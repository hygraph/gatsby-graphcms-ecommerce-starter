import React from 'react';
import { Link } from 'gatsby';

function Layout({ children }) {
  return (
    <React.Fragment>
      <header>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/products">All products</Link>
      </header>

      <main>{children}</main>
    </React.Fragment>
  );
}

export default Layout;
