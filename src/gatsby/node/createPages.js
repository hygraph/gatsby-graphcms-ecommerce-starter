const { buildLocalePath } = require('../../utils/gatsby-node-helpers');
const locales = require('../../../config/locales');

const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      cms: { categories, collections, products },
    },
  } = await graphql(`
    {
      cms {
        categories {
          slug
        }
        collections {
          slug
        }
        products {
          id
        }
      }
    }
  `);

  locales.map(locale => {
    createPage({
      path: buildLocalePath({ locale, path: `/` }),
      component: require.resolve(`../../templates/ProductsPage.js`),
      context: {
        locale: locale.path,
      },
    });
  });

  if (categories) {
    categories.forEach(({ slug }) =>
      createPage({
        path: `/categories/${slug}`,
        component: require.resolve(`../../templates/CategoryPage.js`),
        context: { slug },
      })
    );
  }

  if (collections) {
    collections.forEach(({ slug }) =>
      createPage({
        path: `/collections/${slug}`,
        component: require.resolve(`../../templates/CollectionPage.js`),
        context: { slug },
      })
    );
  }

  if (products) {
    locales.map(locale => {
      products.forEach(({ id }) => {
        createPage({
          path: buildLocalePath({ locale, path: `/products/${id}` }),
          component: require.resolve(`../../templates/ProductPage.js`),
          context: {
            id,
            locale: locale.path,
          },
        });
      });
    });
  }
};

module.exports = createPages;
