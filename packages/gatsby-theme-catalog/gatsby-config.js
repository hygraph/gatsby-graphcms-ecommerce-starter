module.exports = themeOptions => {
  const { graphcmsEndpoint, graphcmsToken } = themeOptions;

  return {
    plugins: [
      {
        resolve: `gatsby-source-graphql`,
        options: {
          typeName: `GraphCMS`,
          fieldName: `cms`,
          url: graphcmsEndpoint,
          headers: {
            Authorization: `Bearer ${graphcmsToken}`,
          },
        },
      },
    ],
  };
};
