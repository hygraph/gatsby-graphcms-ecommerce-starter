module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-storefront`,
      options: {
        graphcmsEndpoint: `https://api-euwest.graphcms.com/v1/ck0z7rqgm0dnc01b26mj505py/master`,
        graphcmsToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiYTBkZTllMjEtYjUxMi00ZTZhLWJmY2ItZmNhM2MxMzRlM2VkIn0.0-z1hMJHqYdWPQx3eqWYedh3JtT80DTW85xiQZYfepQ`,
        enableCartPage: true,
      },
    },
  ],
};
