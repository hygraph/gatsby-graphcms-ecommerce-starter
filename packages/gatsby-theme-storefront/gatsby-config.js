module.exports = themeOptions => {
  const {
    graphcmsEndpoint,
    graphcmsToken,
    enableCartPage = false,
  } = themeOptions;

  return {
    plugins: [
      {
        resolve: `gatsby-theme-catalog`,
        options: {
          graphcmsEndpoint,
          graphcmsToken,
        },
      },
      {
        resolve: `gatsby-theme-cart`,
        options: {
          enableCartPage,
        },
      },
    ],
  };
};
