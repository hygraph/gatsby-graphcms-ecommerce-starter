exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const products = await graphql(`
    {
      cms {
        products {
          id
        }
      }
    }
  `);

  createPage({
    path: `/products`,
    component: require.resolve(`./src/templates/ProductsPage.js`),
  });

  products.data.cms.products.forEach(({ id }) =>
    createPage({
      path: `/products/${id}`,
      component: require.resolve(`./src/templates/ProductPage.js`),
      context: {
        id,
      },
    })
  );
};
