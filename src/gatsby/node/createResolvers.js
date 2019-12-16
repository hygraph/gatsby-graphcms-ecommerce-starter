const md5 = require('md5');

const createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Product: {
      printfulProduct: {
        type: `PrintfulProduct`,
        resolve: ({ printfulProductId }, args, context, info) => {
          return context.nodeModel.getNodeById({
            id: printfulProductId,
            type: `PrintfulProduct`,
          });
        },
      },
    },
    GraphCMS_Review: {
      gravatar: {
        type: `String!`,
        resolve: ({ email }) => {
          const base = 'https://www.gravatar.com/avatar/';
          const hash = md5(email.trim().toLowerCase(), { encoding: 'binary' });

          return `${base}${hash}`;
        },
      },
    },
    PrintfulVariant: {
      formattedPrice: {
        type: `String!`,
        resolve: ({ retail_price }, args, context, info) => {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(retail_price / 100);
        },
      },
      splitName: {
        type: `String!`,
        resolve: ({ name }, args, context, info) => {
          const [, splitVariantName] = name.split(' - ');

          return splitVariantName ? splitVariantName : name;
        },
      },
    },
  };

  createResolvers(resolvers);
};

module.exports = createResolvers;
