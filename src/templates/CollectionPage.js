import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';

function CollectionPage({
  data: {
    cms: { collection },
  },
}) {
  const { products = [] } = collection;

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

export const query = graphql`
  query CollectionPageQuery($id: ID!) {
    cms {
      collection(where: { id: $id }) {
        id
        title
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
  }
`;

export default CollectionPage;
