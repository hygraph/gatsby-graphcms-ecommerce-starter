const algoliaQuery = `
  {
    cms {
      products {
        objectID: id
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
          id
        }
        
      }
    }
  }
`;

module.exports = algoliaQuery;
