import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import ProductGrid from '../components/ProductGrid';

function ProductsPage() {
  const {
    cms: { products },
  } = useStaticQuery(graphql`
    {
      cms {
        products {
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
          }
        }
      }
    }
  `);
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-slategray">Latest</h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={products} />
    </React.Fragment>
  );
}

export default ProductsPage;
