import React from 'react';
import { graphql } from 'gatsby';

function ProductPage({
  data: {
    cms: { product },
  },
}) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-5xl mb-3 text-slategray">{product.name}</h1>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query ProductQuery($id: ID!) {
    cms {
      product(where: { id: $id }) {
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
`;

export default ProductPage;
