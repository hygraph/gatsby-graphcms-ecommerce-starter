import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';

function CollectionPage({
  data: {
    cms: { collection },
  },
}) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-primary">
        {collection.name}
      </h1>
      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={collection.products} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query CollectionQuery($slug: String!, $locale: GraphCMS_Locale!) {
    cms {
      collection(where: { slug: $slug }) {
        name(locale: $locale)
        slug
        products {
          id
          description(locale: $locale) {
            markdown
          }
          name(locale: $locale)
          printfulProductId
          printfulProduct {
            productImage {
              childImageSharp {
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            variants {
              retail_price
            }
          }
        }
      }
    }
  }
`;

export default CollectionPage;
