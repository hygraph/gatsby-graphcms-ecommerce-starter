const md5 = require('md5');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const createResolvers = ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
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
        type: `File`,
        resolve: ({ email }, args, context, info) => {
          const url = `https://gravatar.com/avatar/${md5(
            email.trim().toLowerCase(),
            { encoding: 'binary' }
          )}`;

          return createRemoteFileNode({
            url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
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
