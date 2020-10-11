import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

function ProductsPage({ data: { products } }) {
  return (
    <React.Fragment>
      <SEO pageTitle="Products" />
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
        Latest
      </h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={products.nodes} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query ProductsQuery($locale: GraphCMS_Locale!) {
    products: allGraphCmsProduct(filter: { locale: { eq: $locale } }) {
      nodes {
        id
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
        remoteId
      }
    }
  }
`;

export default ProductsPage;
