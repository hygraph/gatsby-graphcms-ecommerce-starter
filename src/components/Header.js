import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { useCart } from 'react-use-cart';

import LocaleContext from '../context/Locale';
import LocaleLink from './LocaleLink';
import locales from '../../config/locales';

const query = graphql`
  query NavQuery {
    cms {
      categories {
        id
        name
        slug
      }
      collections {
        id
        name
        slug
        name
      }
    }
  }
`;

function Header() {
  const {
    cms: { categories, collections },
  } = useStaticQuery(query);
  const { activeLocale, updateLocale } = useContext(LocaleContext);

  const { isEmpty } = useCart();

  return (
    <header className="bg-white border-b-2 border-gainsboro w-full block flex-grow flex items-center w-auto justify-between">
      <div className="container mx-auto p-6 w-full">
        <nav className="flex items-center justify-between flex-wrap">
          <LocaleLink to="/">
            <svg
              className="fill-current text-primary w-5"
              viewBox="0 0 26 44"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m20.7997 5.86658-5.1998 2.9335-5.1998 2.93312-5.20027 2.9335v5.8665 2.9336 2.933 2.9335 2.9335l5.20027-2.9335 5.1998-2.9335v-2.933-2.9336l-5.1998 2.9336v-5.8666l5.1998-2.9335 5.1998-2.9335v2.9335 2.9335 2.933 2.9336 2.933 2.9335l-5.1998 2.9335-5.1998 2.9331-5.20027 2.9335-5.19983 2.9331 5.19983 2.9335 5.20027-2.9335 5.1998-2.9331 5.1998-2.9335 5.2003-2.9331v-5.867-5.8666-5.8665-2.2501-3.61652-5.86658l-5.2003-2.9335z"
                fillRule="evenodd"
              />
            </svg>
          </LocaleLink>

          <ul className="hidden md:block text-sm md:flex-grow md:ml-4">
            <li className="block my-4 md:inline-block md:my-0">
              <LocaleLink
                to="/"
                className="text-slategray hover:text-primary mr-4"
              >
                Catalog
              </LocaleLink>
            </li>

            {categories.map(category => (
              <li
                key={category.id}
                className="block my-4 md:inline-block md:my-0"
              >
                <LocaleLink
                  className="text-slategray hover:text-primary mr-4"
                  to={`/categories/${category.slug}`}
                >
                  {category.name}
                </LocaleLink>
              </li>
            ))}

            {collections.map(collection => (
              <li
                key={collection.id}
                className="block my-4 md:inline-block md:my-0"
              >
                <LocaleLink
                  className="text-slategray hover:text-primary mr-4"
                  to={`/collections/${collection.slug}`}
                >
                  {collection.name}
                </LocaleLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <div className="relative">
              <select
                value={activeLocale}
                className="block appearance-none bg-white border-none px-4 py-0 pr-8 focus:outline-none focus:bg-white text-lightgray focus:text-slategray rounded"
                onChange={({ target: { value } }) => updateLocale(value)}
              >
                {locales.map(({ label, path }, index) => (
                  <option key={index} value={path}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-lightgray">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="ml-4">
              <Link to="/cart" className="flex items-center relative">
                {!isEmpty && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-2 w-2 h-2 bg-primary rounded-full"></span>
                )}

                <span className="text-slategray">
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
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
