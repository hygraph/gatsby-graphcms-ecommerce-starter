import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

function CategoryPage({
  data: {
    cms: { category },
  },
}) {
  if (!category) return null;

  return (
    <React.Fragment>
      <SEO pageTitle={category.name} />
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
        {category.name}
      </h1>
      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={category.products} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query CategoryQuery($slug: String!, $locales: [GraphCMS_Locale!]!) {
    cms {
      category(locales: $locales, where: { slug: $slug }) {
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
              formattedPrice
              retail_price
            }
          }
        }
      }
    }
  }
`;

export default CategoryPage;
