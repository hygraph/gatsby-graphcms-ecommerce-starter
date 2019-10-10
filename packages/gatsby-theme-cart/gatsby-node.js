exports.createPages = async ({ actions: { createPage } }) => {
  createPage({
    path: `/cart`,
    component: require.resolve(`./src/templates/CartPage.js`),
  });
};
