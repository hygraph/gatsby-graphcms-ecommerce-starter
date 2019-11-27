import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

function Product({ id, name, printfulProduct }) {
  const [{ retail_price }] = printfulProduct.variants;

  return (
    <article key={id} className="px-6 py-3 w-full md:p-6 md:w-1/2 lg:w-1/3">
      <Link to={`/products/${id}`} className="no-underline w-full h-full block">
        <div className="cursor-pointerw-full overflow-hidden relative p-3 bg-gainsboro">
          <Img
            fluid={printfulProduct.productImage.childImageSharp.fluid}
            alt={name}
            title={name}
          />
        </div>

        <div className="py-3">
          <p className="text-slategray font-medium text-lg">{name}</p>
          <p className="text-lightgray text-sm">
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
            }).format(retail_price / 100)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default Product;
