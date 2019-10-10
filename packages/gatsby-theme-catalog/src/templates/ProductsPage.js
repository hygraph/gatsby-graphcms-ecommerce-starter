import React from 'react';
import { Link, graphql } from 'gatsby';

function ProductsPage({
  data: {
    cms: { products },
  },
}) {
  return (
    <React.Fragment>
      <h1>All products</h1>

      <ul>
        {products.map(item => (
          <li key={item.id}>
            <Link to={`/products/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export const query = graphql`
  query ProductsPageQuery {
    cms {
      products {
        id
        name
      }
    }
  }
`;

export default ProductsPage;
