import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import cx from 'classnames';

const query = graphql`
  query NavQuery {
    cms {
      categories {
        id
        slug
        title
      }
      collections {
        id
        slug
        title
      }
    }
  }
`;

function Navigation() {
  const [open, setOpen] = useState(true);
  const {
    cms: { categories, collections },
  } = useStaticQuery(query);

  const navClass = cx('site-nav w-full px-3 md:px-0', {
    open,
  });

  const toggle = () => setOpen(state => !state);

  return (
    <React.Fragment>
      <button
        className="appearance-none focus:outline-none z-10 sm:hidden"
        onClick={toggle}
      >
        <span className="text-gray-400">
          {open ? (
            <svg
              className="fill-current w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          ) : (
            <svg
              className="fill-current w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          )}
        </span>
      </button>

      <nav className={navClass}>
        <ul className="my-6">
          <li className="my-1">
            <Link
              className="font-hairline text-xl text-lightgray hover:text-primary block"
              to="/"
            >
              Home
            </Link>
          </li>

          <li className="my-1">
            <Link
              className="font-hairline text-xl text-lightgray hover:text-primary block"
              to="/products"
            >
              Catalog
            </Link>
          </li>

          {collections.map(collection => (
            <li key={collection.id} className="my-1">
              <Link
                className="font-hairline text-xl text-lightgray hover:text-primary block"
                to={`/collections/${collection.slug}`}
              >
                {collection.title}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="border-b border-gainsboro w-10" />

        <ul className="my-6">
          {categories.map(category => (
            <li key={category.id} className="my-1">
              <Link
                className="font-hairline text-xl text-lightgray hover:text-primary block"
                to={`/categories/${category.slug}`}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navigation;
