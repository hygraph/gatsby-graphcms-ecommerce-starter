import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';

function ProductsPage({
  data: {
    cms: { products },
  },
}) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-slategray">Latest</h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={products} />
    </React.Fragment>
  );
}

export const query = graphql`
  query ProductsPageQuery {
    cms {
      products {
        id
        name
        images {
          handle
          width
          height
        }
      }
    }
  }
`;

export default ProductsPage;
