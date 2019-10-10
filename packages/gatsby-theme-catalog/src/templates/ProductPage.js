import React from 'react';
import { graphql } from 'gatsby';

function ProductPage({
  data: {
    cms: { product },
  },
}) {
  return (
    <React.Fragment>
      <h1>{product.name}</h1>

      <p>
        Product ID: <pre>{product.id}</pre>
      </p>
    </React.Fragment>
  );
}

export const query = graphql`
  query ProductPageQuery($id: ID!) {
    cms {
      product(where: { id: $id }) {
        id
        name
      }
    }
  }
`;

export default ProductPage;
