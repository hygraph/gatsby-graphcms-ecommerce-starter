const algoliaQuery = `
  {
    products: allGraphCmsProduct(filter: { locale: { eq: en } }) {
      nodes {
        objectID: remoteId
        name
        printfulProductId
        printfulProduct {
          thumbnail_url
          variants {
            formattedPrice
          }
        }
        category {
          name
        }
        collections {
          name
        }
        reviews {
          id: remoteId
        }
      }
    }
  }
`;

module.exports = algoliaQuery;
