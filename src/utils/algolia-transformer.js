const algoliaTransformer = ({
  data: {
    cms: { products },
  },
}) =>
  products.map(
    ({
      printfulProductId,
      printfulProduct: { thumbnail_url: image, variants },
      category,
      collections,
      reviews,
      ...product
    }) => {
      const [{ formattedPrice }] = variants;

      return {
        ...product,
        category: category ? category.name : null,
        collections: collections ? collections.map(({ name }) => name) : [],
        hasReviews: reviews.length > 0,
        image,
        formattedPrice,
      };
    }
  );

module.exports = algoliaTransformer;
