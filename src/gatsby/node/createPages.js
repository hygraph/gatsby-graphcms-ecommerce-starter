const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      cms: { categories, collections, products },
    },
  } = await graphql(`
    fragment ProductInfo on GraphCMS_Product {
      id
      name
      price
      images {
        handle
        width
        height
      }
    }

    {
      cms {
        categories {
          id
          title
          slug
          products {
            ...ProductInfo
          }
        }
        collections {
          id
          title
          slug
          products {
            ...ProductInfo
          }
        }
        products {
          ...ProductInfo
        }
      }
    }
  `);

  if (categories) {
    categories.forEach(({ products, ...category }) =>
      createPage({
        path: `/categories/${category.slug}`,
        component: require.resolve(`../../templates/CategoryPage.js`),
        context: {
          category,
          products,
        },
      })
    );
  }

  if (collections) {
    collections.forEach(({ products, ...collection }) =>
      createPage({
        path: `/collections/${collection.slug}`,
        component: require.resolve(`../../templates/CollectionPage.js`),
        context: {
          collection,
          products,
        },
      })
    );
  }

  if (products) {
    createPage({
      path: `/products`,
      component: require.resolve(`../../templates/ProductsPage.js`),
      context: {
        products,
      },
    });

    products.forEach(product =>
      createPage({
        path: `/products/${product.id}`,
        component: require.resolve(`../../templates/ProductPage.js`),
        context: {
          product,
        },
      })
    );
  }
};

module.exports = createPages;
