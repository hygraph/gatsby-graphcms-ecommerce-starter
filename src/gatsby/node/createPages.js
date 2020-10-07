const { buildLocalePath } = require('../../utils/gatsby-node-helpers');
const locales = require('../../../config/locales');

const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { categories, collections, products },
  } = await graphql(`
    {
      categories: allGraphCmsCategory {
        nodes {
          slug
        }
      }
      collections: allGraphCmsCollection {
        nodes {
          slug
        }
      }
      products: allGraphCmsProduct {
        nodes {
          id: remoteId
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

    if (categories) {
      categories.nodes.forEach(({ slug }) =>
        createPage({
          path: buildLocalePath({ locale, path: `/categories/${slug}` }),
          component: require.resolve(`../../templates/CategoryPage.js`),
          context: { slug, locale: locale.path },
        })
      );
    }

    if (collections) {
      collections.nodes.forEach(({ slug }) =>
        createPage({
          path: buildLocalePath({ locale, path: `/collections/${slug}` }),
          component: require.resolve(`../../templates/CollectionPage.js`),
          context: { slug, locale: locale.path },
        })
      );
    }

    if (products) {
      products.nodes.forEach(({ id }) => {
        createPage({
          path: buildLocalePath({ locale, path: `/products/${id}` }),
          component: require.resolve(`../../templates/ProductPage.js`),
          context: { id, locale: locale.path },
        });
      });
    }
  });
};

module.exports = createPages;
