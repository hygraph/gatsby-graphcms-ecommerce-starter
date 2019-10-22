import React from 'react';

import Product from './Product';

function ProductGrid({ products }) {
  if (!products) return null;

  return <div className="flex flex-wrap -mx-6">{products.map(Product)}</div>;
}

export default ProductGrid;
