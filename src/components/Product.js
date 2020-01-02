import React from 'react';
import Img from 'gatsby-image';

import LocaleLink from './LocaleLink';

function Product({ id, name, printfulProduct }) {
  const [{ formattedPrice }] = printfulProduct.variants;

  return (
    <article key={id} className="p-6 w-full md:w-1/2 lg:w-1/3">
      <LocaleLink
        to={`/products/${id}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="bg-gainsboro rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
          <Img
            fluid={printfulProduct.productImage.childImageSharp.fluid}
            alt={name}
            title={name}
          />

          <div className="pt-3 md:pt-6 text-center">
            <p className="text-slategray font-bold text-lg group-hover:text-primary mb-1">
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
