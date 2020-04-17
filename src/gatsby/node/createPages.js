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
        locales: locale.path,
      },
    });

    if (categories) {
      categories.forEach(({ slug }) =>
        createPage({
          path: buildLocalePath({ locale, path: `/categories/${slug}` }),
          component: require.resolve(`../../templates/CategoryPage.js`),
          context: { slug, locales: locale.path },
        })
      );
    }

    if (collections) {
      collections.forEach(({ slug }) =>
        createPage({
          path: buildLocalePath({ locale, path: `/collections/${slug}` }),
          component: require.resolve(`../../templates/CollectionPage.js`),
          context: { slug, locales: locale.path },
        })
      );
    }

    if (products) {
      products.forEach(({ id }) => {
        createPage({
          path: buildLocalePath({ locale, path: `/products/${id}` }),
          component: require.resolve(`../../templates/ProductPage.js`),
          context: { id, locales: locale.path },
        });
      });
    }
  });
};

module.exports = createPages;
