module.exports = themeOptions => {
  const { graphcmsEndpoint, graphcmsToken } = themeOptions;

  return {
    plugins: [
      {
        resolve: `gatsby-theme-catalog`,
        options: {
          graphcmsEndpoint,
          graphcmsToken,
        },
      },
      `gatsby-theme-cart`,
    ],
  };
};
