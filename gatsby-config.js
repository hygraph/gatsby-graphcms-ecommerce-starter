require(`dotenv`).config();

module.exports = {
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/main.css'],
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: ['300', '400', '500'],
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GraphCMS`,
        fieldName: `cms`,
        url: process.env.GRAPHCMS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-source-printful`,
      options: {
        apiKey: process.env.PRINTFUL_API_KEY,
      },
    },
    `gatsby-transformer-sharp`,
  ],
};
