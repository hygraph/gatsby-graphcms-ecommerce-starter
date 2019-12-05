import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';

function CategoryPage({
  data: {
    cms: { category },
  },
}) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-primary">{category.name}</h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={category.products} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query CategoryQuery($slug: String!) {
    cms {
      category(where: { slug: $slug }) {
        name
        slug
        products {
          id
          description {
            markdown
          }
          name
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

export default CategoryPage;
