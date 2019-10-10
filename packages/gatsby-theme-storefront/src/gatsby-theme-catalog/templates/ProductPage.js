import React from 'react';

import { CartButton } from 'gatsby-theme-cart';

function ProductPage({
  data: {
    cms: { product },
  },
}) {
  return (
    <React.Fragment>
      <h1>{product.name}</h1>

      <pre>{JSON.stringify(product, null, 2)}</pre>

      <CartButton name={product.name} price={1000} />
    </React.Fragment>
  );
}

export default ProductPage;
