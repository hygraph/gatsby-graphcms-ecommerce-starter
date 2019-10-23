import React from 'react';

import ReviewsList from '../components/ReviewsList';

function ProductPage({ pageContext: { product, reviews } }) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-5xl mb-3 text-slategray">{product.name}</h1>

      <ReviewsList reviews={reviews} />
    </React.Fragment>
  );
}

export default ProductPage;
