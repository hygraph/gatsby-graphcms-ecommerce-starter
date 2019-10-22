import React from 'react';

function ProductPage({ pageContext: { product } }) {
  return (
    <React.Fragment>
      <h1>{product.name}</h1>

      <p>
        Product ID: <pre>{product.id}</pre>
      </p>
    </React.Fragment>
  );
}

export default ProductPage;
