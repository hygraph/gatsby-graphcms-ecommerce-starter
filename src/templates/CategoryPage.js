import React from 'react';

import ProductGrid from '../components/ProductGrid';

function CategoryPage({ pageContext: { category, products = [] } }) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-slategray">
        {category.title}
      </h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={products} />
    </React.Fragment>
  );
}

export default CategoryPage;
