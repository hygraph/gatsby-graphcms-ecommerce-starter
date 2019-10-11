import React from 'react';
import { graphql } from 'gatsby';

function CollectionPage({
  data: {
    cms: { collection },
  },
}) {
  return (
    <React.Fragment>
      <h1>{collection.title}</h1>
      <pre>{JSON.stringify(collection, null, 2)}</pre>
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
        }
      }
    }
  }
`;

export default CollectionPage;
