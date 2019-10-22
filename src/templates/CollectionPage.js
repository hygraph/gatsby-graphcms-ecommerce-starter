import React from 'react';

import ProductGrid from '../components/ProductGrid';

function CollectionPage({ pageContext: { collection, products = [] } }) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-slategray">
        {collection.title}
      </h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={products} />
    </React.Fragment>
  );
}

export default CollectionPage;
