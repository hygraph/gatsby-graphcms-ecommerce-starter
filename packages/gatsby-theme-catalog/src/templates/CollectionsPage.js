import React from 'react';
import { Link, graphql } from 'gatsby';

function CollectionsPage({
  data: {
    cms: { collections },
  },
}) {
  return (
    <React.Fragment>
      <h1>All collections</h1>

      {collections.map(collection => (
        <div key={collection.id}>
          <h3>
            <Link to={`/collections/${collection.slug}`}>
              {collection.title}
            </Link>
          </h3>

          <ul>
            {collection.products.map(item => (
              <li key={item.id}>
                <Link to={`/products/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
}

export const query = graphql`
  query CollectionsPageQuery {
    cms {
      collections {
        id
        slug
        title
        products {
          id
          name
        }
      }
    }
  }
`;

export default CollectionsPage;
