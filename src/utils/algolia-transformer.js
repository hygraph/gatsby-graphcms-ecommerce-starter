const algoliaTransformer = ({
  data: {
    cms: { products },
  },
}) =>
  products.map(
    ({
      printfulProductId,
      printfulProduct: { thumbnail_url: image },
      category,
      collections,
      reviews,
      ...product
    }) => ({
      ...product,
      category: category ? category.name : null,
      collections: collections ? collections.map(({ name }) => name) : [],
      hasReviews: reviews.length > 0,
      image,
    })
  );

module.exports = algoliaTransformer;
