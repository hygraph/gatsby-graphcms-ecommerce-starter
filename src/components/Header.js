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

function Header() {
  const [open, setOpen] = useState(true);
  const {
    cms: { categories, collections },
  } = useStaticQuery(query);

  const toggle = () => setOpen(state => !state);

  const navClass = cx('py-6 w-full', {
    open,
    'bg-light-gray': open,
    'bg-white': !open,
  });

  return (
    <header className="w-full block flex-grow md:flex md:items-center md:w-auto md:justify-between border-b border-gainsboro">
      <div className={navClass}>
        <div className="container mx-auto px-6 w-full">
          <nav className="flex items-center justify-between flex-wrap">
            <ul className="text-sm md:flex-grow">
              <li className="block my-4 md:inline-block md:my-0">
                <Link className="text-slategray hover:text-primary mr-4" to="/">
                  Catalog
                </Link>
              </li>

              {categories.map(category => (
                <li
                  key={category.id}
                  className="block my-4 md:inline-block md:my-0"
                >
                  <Link
                    className="text-slategray hover:text-primary mr-4"
                    to={`/categories/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}

              {collections.map(collection => (
                <li
                  key={collection.id}
                  className="block my-4 md:inline-block md:my-0"
                >
                  <Link
                    className="text-slategray hover:text-primary mr-4"
                    to={`/collections/${collection.slug}`}
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <span className="text-primary">
                <svg
                  className="fill-current w-4"
                  viewBox="0 0 183 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m158.89468 130.62487c4.251606-.36971 7.800068-3.39683 8.83512-7.53706l15.37511-61.50044c.717592-2.8703693.127265-5.9111588-1.612209-8.3045222s-4.449503-3.8935742-7.401201-4.0971378l-117.71107-8.118-16.02123-16.02121c2.2738113-8.7532882-1.6139711-17.94264136-9.4795072-22.40622874-7.8655362-4.46358738-17.7483056-3.08883954-24.09697268 3.35202206-6.34866706 6.44086158-7.58079767 16.34242298-3.00428111 24.14279268 4.57651655 7.8003697 13.82096279 11.5552702 22.54056099 9.155504l16.23264 16.23267 7.04675 70.46748-26.05031 34.1771c-8.2549112-1.06077-16.30400636 3.101228-20.21037884 10.450313-3.90637248 7.349084-2.85352697 16.349178 2.64357749 22.598228 5.49710445 6.249051 14.28948365 8.440907 22.07668215 5.503504 7.7871985-2.937402 12.9415653-10.390097 12.9420392-18.712885.0031978-2.649474-.5217247-5.273012-1.54409-7.71729l15.34338-20.12993 78.92571 30.85371c1.358981 8.951813 8.561369 15.874634 17.559944 16.87834 8.998576 1.003707 17.549325-4.162 20.847348-12.594368 3.298024-8.432367.520879-18.028581-6.770881-23.396264-7.291759-5.367684-17.279756-5.168275-24.351461.486172l-67.39662-26.34673z"
                    transform="translate(-1)"
                  />
                </svg>
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
