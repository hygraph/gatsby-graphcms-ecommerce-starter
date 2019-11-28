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
    PrintfulVariant: {
      splitName: {
        type: `String!`,
        resolve: ({ name }, args, context, info) => {
          const [, splitVariantName] = name.split(' - ');

          return splitVariantName;
        },
      },
    },
  };

  createResolvers(resolvers);
};

module.exports = createResolvers;
