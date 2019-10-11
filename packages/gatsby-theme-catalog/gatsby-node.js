exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      cms {
        collections {
          id
          slug
        }
        products {
          id
        }
      }
    }
  `);

  createPage({
    path: `/collections`,
    component: require.resolve(`./src/templates/CollectionsPage.js`),
  });

  pages.data.cms.collections.forEach(({ id, slug }) =>
    createPage({
      path: `/collections/${slug}`,
      component: require.resolve(`./src/templates/CollectionPage.js`),
      context: {
        id,
      },
    })
  );

  createPage({
    path: `/products`,
    component: require.resolve(`./src/templates/ProductsPage.js`),
  });

  pages.data.cms.products.forEach(({ id }) =>
    createPage({
      path: `/products/${id}`,
      component: require.resolve(`./src/templates/ProductPage.js`),
      context: {
        id,
      },
    })
  );
};
