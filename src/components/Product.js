import React from 'react';
import Img from 'gatsby-image';

import LocaleLink from './LocaleLink';

function Product({ id, name, printfulProduct }) {
  const [{ formattedPrice }] = printfulProduct.variants;

  return (
    <article key={id} className="px-6 py-3 w-full md:p-6 md:w-1/2 lg:w-1/3">
      <LocaleLink
        to={`/products/${id}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="bg-white shadow rounded cursor-pointer w-full overflow-hidden relative p-3 md:p-6">
          <Img
            fluid={printfulProduct.productImage.childImageSharp.fluid}
            alt={name}
            title={name}
          />

          <div className="pt-3 md:pt-6 md:flex md:items-center md:justify-between">
            <p className="text-slategray font-medium text-lg group-hover:text-primary">
              {name}
            </p>
            <p className="text-lightgray text-sm">{formattedPrice}</p>
          </div>
        </div>
      </LocaleLink>
    </article>
  );
}

export default Product;
