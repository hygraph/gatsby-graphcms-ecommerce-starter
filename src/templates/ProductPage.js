import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useCart } from 'react-use-cart';
import queryString from 'query-string';
import { navigate } from '@reach/router';

import ReviewsList from '../components/ReviewsList';
import SEO from '../components/SEO';

function ProductPage({
  data: {
    cms: { product },
  },
  location,
}) {
  const { variantId } = queryString.parse(location.search);
  const { variants } = product.printfulProduct;
  const [firstVariant] = variants;
  const [variantQuantity, setVariantQuantity] = useState(1);
  const [activeVariantId, setActiveVariantId] = useState(
    variantId || firstVariant.id
  );
  const { addItem } = useCart();

  const activeVariant = variants.find(
    variant => variant.id === activeVariantId
  );

  useEffect(() => {
    navigate(`?variantId=${activeVariantId}`, { replace: true });
  }, [activeVariantId]);

  if (!product) return null;

  return (
    <React.Fragment>
      <SEO
        pageTitle={product.name}
        image={
          activeVariant
            ? activeVariant.variantImage.childImageSharp.fluid.src
            : product.printfulProduct.productImage.childImageSharp.fluid.src
        }
      />

      <div className="lg:flex -mx-6">
        <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
          <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
            <Img
              fluid={
                activeVariant
                  ? activeVariant.variantImage.childImageSharp.fluid
                  : product.printfulProduct.productImage.childImageSharp.fluid
              }
              alt={product.name}
              title={product.name}
            />
          </div>
        </div>

        <div className="px-6 md:py-3 lg:w-1/2">
          <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
            {product.name}
          </h1>

          <div className="mb-6">
            <p className="font-semibold text-2xl text-slategray">
              {activeVariant && activeVariant.formattedPrice}
            </p>
          </div>

          {product.description && (
            <div className="mb-6">
              <p className="leading-loose text-lightgray">
                {product.description.markdown}
              </p>
            </div>
          )}
          <div className="md:flex md:flex-wrap -mx-3">
            <div className="md:w-3/4 px-3 mb-6">
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="style"
              >
                Style
              </label>

              <div className="relative">
                <select
                  id="style"
                  value={activeVariantId}
                  onChange={({ target: { value } }) =>
                    setActiveVariantId(value)
                  }
                  className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                >
                  {variants.map((variant, index) => (
                    <option key={index} value={variant.id}>
                      {variant.splitName}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slategray">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:w-1/4 px-3 mb-6">
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="quantity"
              >
                Quantity
              </label>

              <div className="relative">
                <select
                  id="quantity"
                  value={variantQuantity}
                  className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                  onChange={({ target: { value } }) =>
                    setVariantQuantity(parseInt(value))
                  }
                >
                  {new Array(5)
                    .fill(0)
                    .map((v, k) => k + 1)
                    .map(i => ({ value: i, label: i }))
                    .map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slategray">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <button
              className="block w-full bg-primary hover:bg-slategray px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
              onClick={() =>
                addItem(
                  {
                    id: activeVariant.id,
                    price: activeVariant.retail_price,
                    image: activeVariant.variantImage,
                    name: activeVariant.name,
                    description: product.description.markdown,
                  },
                  variantQuantity
                )
              }
              disabled={!activeVariant}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <ReviewsList productId={product.id} reviews={product.reviews} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query ProductQuery($id: ID!, $locales: [GraphCMS_Locale!]!) {
    cms {
      product(locales: $locales, where: { id: $id }) {
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
            id
            formattedPrice
            name
            retail_price
            splitName
            variantImage {
              childImageSharp {
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        reviews(orderBy: createdAt_DESC) {
          id
          email
          gravatar {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          headline
          message
          rating
        }
      }
    }
  }
`;

export default ProductPage;
