const { buildLocalePath } = require('../../utils/gatsby-node-helpers');
const locales = require('../../../config/locales');

const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      cms: { categories, collections, ...products },
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
        deProducts: products {
          id
          description(locale: DE) {
            markdown
          }
          name(locale: DE)
        }
        enProducts: products {
          id
          description(locale: EN) {
            markdown
          }
          name(locale: EN)
        }
      }
    }
  `);

  createPage({
    path: `/`,
    component: require.resolve(`../../templates/ProductsPage.js`),
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
    Object.entries(products).forEach(([key, pages]) => {
      pages.forEach(({ id, ...page }) => {
        const [localeKey, type] = key
          .split(/(?=[A-Z])/)
          .map(s => s.toLowerCase());

        const locale = locales.find(locale => locale.path === localeKey);

        createPage({
          path: buildLocalePath({ locale, type, identifier: id }),
          component: require.resolve(`../../templates/ProductPage.js`),
          context: {
            ...page,
            id,
            locale: locale.path,
          },
        });
      });
    });
  }
};

module.exports = createPages;
