exports.createPages = async ({ actions: { createPage } }, themeOptions) => {
  if (themeOptions.enableCartPage)
    createPage({
      path: `/cart`,
      component: require.resolve(`./src/templates/CartPage.js`),
    });
};
