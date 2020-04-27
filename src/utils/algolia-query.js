const algoliaQuery = `
  {
    cms {
      products {
        objectID: id
        name
        printfulProductId
        printfulProduct {
          thumbnail_url
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
