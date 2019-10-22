const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      cms: { categories, collections, products },
    },
  } = await graphql(`
    {
      cms {
        categories {
          id
          slug
        }
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

  if (categories) {
    categories.forEach(({ id, slug }) =>
      createPage({
        path: `/categories/${slug}`,
        component: require.resolve(`../../templates/CategoryPage.js`),
        context: {
          id,
        },
      })
    );
  }

  if (collections) {
    collections.forEach(({ id, slug }) =>
      createPage({
        path: `/collections/${slug}`,
        component: require.resolve(`../../templates/CollectionPage.js`),
        context: {
          id,
        },
      })
    );
  }

  if (products) {
    createPage({
      path: `/products`,
      component: require.resolve(`../../templates/ProductsPage.js`),
    });

    products.forEach(({ id }) =>
      createPage({
        path: `/products/${id}`,
        component: require.resolve(`../../templates/ProductPage.js`),
        context: {
          id,
        },
      })
    );
  }
};

module.exports = createPages;
